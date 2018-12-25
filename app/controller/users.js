const db = require('../config/db.config.js');

exports.login = async (req, res) => {
    if (typeof req.body.public_key === 'undefined') {
        return res.status(400).json({ msg: 'Params Invalid' })
    }
    const account = await db.users.findByPk(req.body.public_key)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        return res.status(200).json({ account_info: account })
    }
}

exports.getName = async (req, res) => {
    const account = await db.users.findByPk(req.params.id)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        return res.status(200).json({name: account.name})
    }
}