
let { RpcClient } = require('tendermint')

let client = RpcClient('https://gorilla.forest.network:443')
const { executeTx, executeTxTest } = require('./lib/tx');
const db = require('./app/config/db.config');

const axios = require('axios');
const connectDB = async () => {
    await db.sequelize.sync();
}
const { startwebsoket } = require('./SubcribeNewBlock')
async function asyncForEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i);
    }
}

const backupData = async (rs) => {
    await asyncForEach(rs, async (block, index) => {
        if (block.block.header.num_txs !== '0') {
            await asyncForEach(block.block.data.txs, async (tx, index) => {
                await executeTx({
                    height: block.block.header.height,
                    tx: block.block.data.txs[0],
                    time: block.block.header.time,
                    data_hash: block.block.header.data_hash
                })
            })
        }
    })
}
const addQuery = async (height, query, count) => {
    console.log('--------------------- begin ' + height + ' to ' + (height + count - 1) + ' ----------------------')
    for (let j = height; j <= (height + count - 1); j++) {
        query.push(client.block({ height: j }))
    }
}
const queryBlock = async (height, count) => {
    var query = [];
    await addQuery(height, query, count);
    await Promise.all(query).then(async rs => {
        await backupData(rs);
    }).catch(err => {
        console.log(err);
    })

}

const queryAllBlock = async (total_height, cb) => {
    await connectDB();
    var count = 10;
    for (let i = 1; i <= total_height; i += count) {
        await axios.get('https://komodo.forest.network/status').then((rs) => {
            const latest_block_height = rs.data.result.sync_info.latest_block_height;
            total_height = latest_block_height;
            console.log('      total height:   ', total_height)
        })
        if ((total_height - i) < 10) {
            count = total_height - i
            console.log('count: ', count)
        }
        await cb(i, count);
        if ((count) === 0) {
            break;
        }
    }
}

readAllBlock = async () => {
    await queryAllBlock(23620, async (height, count) => {
        await queryBlock(height, count);
    })
    startwebsoket();
}

module.exports = { readAllBlock }