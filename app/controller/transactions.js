const db = require('../config/db.config.js')
async function asyncForEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i);
    }
}
exports.getTweetsInHome = async (req, res) => {
    try {
        const account = await db.users.findByPk(req.params.id)
        if (!account) {
            return res.status(400).json({ msg: 'Account does not exists' })
        }
        else {
            const per_page = parseInt(req.params.per_page);
            const page = parseInt(req.params.page);
            const listFollowings = await db.followings.findAll({ where: { follower: req.params.id } })
            const listIDFollowings = [req.params.id];
            await asyncForEach(listFollowings, async (e, i) => {
                listIDFollowings.push(e.followed);
            })
            await db.transactions.findAndCountAll({
                where: {
                    account: listIDFollowings,
                },
                order: [['createAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page
            }).then(rs => {
                //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
                var next_page = parseInt(req.params.page) + 1;
                //Kiểm tra còn dữ liệu không
                if ((parseInt(rs.rows.length) + (next_page - 2) * parseInt(req.params.per_page)) === parseInt(rs.count))
                    next_page = -1;
                if (parseInt(rs.rows.length) === 0)
                    next_page = -1;
                return res.status(200).json({
                    itemCount: rs.rows.length, //số lượng record được trả về
                    data: rs.rows,
                    next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
                })
            })
        }
    }
    catch (e) {
        return res.status(400).json({ msg: e })
    }

}

exports.getTweetsInMe = async (req, res) => {
    try {
        const account = await db.users.findByPk(req.params.id)
        if (!account) {
            return res.status(400).json({ msg: 'Account does not exists' })
        }
        else {
            const per_page = parseInt(req.params.per_page);
            const page = parseInt(req.params.page);
            await db.transactions.findAndCountAll({
                where: {
                    account: req.params.id,
                },
                order: [['createAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page
            }).then(rs => {
                //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
                var next_page = parseInt(req.params.page) + 1;
                //Kiểm tra còn dữ liệu không
                if ((parseInt(rs.rows.length) + (next_page - 2) * parseInt(req.params.per_page)) === parseInt(rs.count))
                    next_page = -1;
                if (parseInt(rs.rows.length) === 0)
                    next_page = -1;
                return res.status(200).json({
                    itemCount: rs.rows.length, //số lượng record được trả về
                    data: rs.rows,
                    next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
                })
            })
        }
    }
    catch (e) {
        return res.status(400).json({ msg: e })
    }
}
exports.getNumOfTweetsById = async (req, res) => {
    try {
        const account = await db.users.findByPk(req.params.id)
        if (!account) {
            return res.status(400).json({ msg: 'Account does not exists' })
        }
        else {
            await db.transactions.findAll({
                where: {
                    account: req.params.id,
                },
                order: [['createAt', 'DESC']],
            }).then(rs => {
                return res.status(200).json({
                   number: rs.length
                })
            })
        }
    }
    catch (e) {

    }
}