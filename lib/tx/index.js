const { decode, verify, hash } = require('../transaction');

const Decimal = require('decimal.js');
const moment = require('moment');
const db = require('../../app/config/db.config');
//db.sequelize.sync();

const connectDB = async () => {
    await db.sequelize.sync();
}
const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

const buffer_to_obj = async (buff) => {
    return JSON.stringify(buff);
}

const executeTxTest = async (param) => {
    const txSize = Buffer.from(param.tx, 'base64').length;
    const tx = decode(Buffer.from(param.tx, 'base64'));
    tx.hash = hash(tx);
    const { operation } = tx;
    console.log(operation);
    if (operation === 'post') {
        console.log(tx.params.content.toString('utf8'));
    }
}

const executeTx = async (param) => {
    await connectDB();
    const txSize = Buffer.from(param.tx, 'base64').length;
    const tx = decode(Buffer.from(param.tx, 'base64'));
    tx.hash = hash(tx);
    const { operation } = tx;
    console.log(operation);
    if (!verify(tx)) {
        console.log('Wrong signature')
        return "Wrong signature";
    }

    const account = await db.users.findByPk(tx.account)
    if (!account) {
        console.log(tx.account, 'Account does not exists')
        return "Account does not exists"
    }
    const nextSequence = new Decimal(account.sequence).add(1);
    if (!nextSequence.equals(tx.sequence)) {
        console.log('Sequence mismatch')
        return ('Sequence mismatch');
    }
    account.sequence = nextSequence.toFixed();

    // Check memo
    if (tx.memo.length > 32) {
        console.log('Memo has more than 32 bytes.')
        return ('Memo has more than 32 bytes.');
    }

    // Update bandwidth
    const diff = account.bandwidthTime
        ? moment(param.time).unix() - moment(account.bandwidthTime).unix()
        : BANDWIDTH_PERIOD;
    const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
    // 24 hours window max 65kB
    account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
    if (account.bandwidth > bandwidthLimit) {
        console.log('Bandwidth limit exceeded')
        return ('Bandwidth limit exceeded');
    }
    // Check bandwidth
    account.bandwidthTime = param.time;
    await account.save();
    // Process operation
    if (operation === 'create_account') {
        const { address } = tx.params;
        const found = await db.users.findByPk(address);
        if (found) {
            console.log('Account address existed')
            return ('Account address existed');
        }
        await db.users.create({
            id: address,
            balance: 0,
            sequence: 0,
            bandwidth: 0,
        });
        console.log(`${tx.hash}: ${account.id} created ${address}`);
    } else if (operation === 'payment') {
        const { address, amount } = tx.params;
        const found = await db.users.findByPk(address);
        if (!found) {
            console.log('Destination address does not exist')
            return ('Destination address does not exist');
        }
        if (address === tx.account) {
            console.log('Cannot transfer to the same address')
            return ('Cannot transfer to the same address');
        }
        if (amount <= 0) {
            console.log('Amount must be greater than 0')
            return ('Amount must be greater than 0');
        }
        if (new Decimal(amount).gt(account.balance)) {
            console.log('Amount must be less or equal to source balance')
            return ('Amount must be less or equal to source balance');
        }
        found.balance = new Decimal(found.balance).add(amount).toFixed();
        account.balance = new Decimal(account.balance).sub(amount).toFixed();
        await found.save();
        await account.save();
        await db.payments.create({
            sender: account.id,
            receiver: address,
            amount: amount,
            createAt: param.time,
        })
        console.log(`${tx.hash}: ${account.id} transfered ${amount} to ${address}`);
    } else if (operation === 'post') {
        const { content, keys } = tx.params;
        if (typeof content === 'undefined' || typeof keys === 'undefined')
            return ('Param is not formatted accurately..!!');
        if (typeof content.type === 'undefined' || typeof content.text === 'undefined')
            return ('Param is not formatted accurately..!!');
        ////


        console.log(`${tx.hash}: ${account.id} posted ${content.length} bytes with ${keys.length} keys`);
    } else if (operation === 'update_account') {
        const { key, value } = tx.params;
        console.log(`${tx.hash}: ${account.id} update ${key} with ${value.length} bytes`);
        // } else if (operation === 'interact') {
        //     const { object, content } = tx.params;
        //     // Check if object exists
        //     const transaction = await Transaction.findByPk(object, { transaction: dbTransaction });
        //     if (!transaction) {
        //         return ('Object does not exist');
        //     }
        //     tx.params.address = transaction.author;
        //     console.log(`${tx.hash}: ${account.address} interact ${object} with ${content.length} bytes`);
    } else {
        console.log('Operation is not support.')
        return ('Operation is not support.');
    }

}


module.exports = { executeTx, executeTxTest };