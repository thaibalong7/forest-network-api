const db = require('./app/config/db.config');

const connectDB = async () => {
    await db.sequelize.sync();
}

async function asyncForEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i);
    }
}
const { executeTx, executeTxTest } = require('./lib/tx');

async function startwebsoket() {
    let { RpcClient } = require('tendermint')
    await connectDB();
    let client = RpcClient('wss://komodo.forest.network:443')
    console.log('web socket start ... ')
    client.subscribe({ query: "tm.event='NewBlock'" }, async (block) => {
        console.log(block);
        if (block.block.header.num_txs !== '0') {
            await asyncForEach(block.block.data.txs, async (tx, index) => {
                await executeTx({
                    tx: tx,
                    time: block.block.header.time,
                    height: block.block.header.height,
                    data_hash: block.block.header.data_hash
                })
            })
        }
    }).catch(e => { console.log("ERR", e) })

}
// startwebsoket();
module.exports = { startwebsoket };