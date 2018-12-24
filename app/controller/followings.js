const db = require('../config/db.config.js')

async function asyncForEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i);
    }
}

exports.getAllFollowings = async (req, res) => {
    const account = await db.users.findByPk(req.params.id)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        db.followings.findAll({
            where: {
                follower: req.params.id
            }
        }).then(async rs => {
            var data = [];
            await asyncForEach(rs, async (e, i) => {
                const followed = await db.users.findByPk(e.followed);
                if (followed) {
                    data.push({
                        id: followed.id,
                        name: followed.name,
                        avatar: followed.avatar,
                    })
                }
            })
            await res.status(200).json({ data: data });
        })
    }
}
exports.getNumOfFollowed = async (req, res) => {
    const account = await db.users.findByPk(req.params.id)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        db.followings.findAll({
            where: {
                follower: req.params.id
            }
        }).then(async rs => {
            res.status(200).json({ number: rs.length })
        })
    }
}
exports.getAllFollowers = async (req, res) => {
    const account = await db.users.findByPk(req.params.id)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        db.followings.findAll({
            where: {
                followed: req.params.id
            }
        }).then(async rs => {
            var data = [];
            await asyncForEach(rs, async (e, i) => {
                const follower = await db.users.findByPk(e.follower);
                if (follower) {
                    data.push({
                        id: follower.id,
                        name: follower.name,
                        avatar: follower.avatar,
                    })
                }
            })
            res.status(200).json({ data: data });
        })
    }
}
exports.getNumOfFollower = async (req, res) => {
    const account = await db.users.findByPk(req.params.id)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        db.followings.findAll({
            where: {
                followed: req.params.id
            }
        }).then(async rs => {
            res.status(200).json({ number: rs.length })
        })
    }
}
