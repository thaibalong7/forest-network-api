const db = require('../config/db.config.js')

exports.getPaymentById = (req, res) => {
    if (typeof req.body.public_key === 'undefined') {
        return res.status(400).json({ msg: 'Params Invalid' })
    }
    const account = await db.users.findByPk(req.body.public_key)
    if (!account) {
        return res.status(400).json({ msg: 'Account does not exists' })
    }
    else {
        db.payments.findAll({
            where: {
                $or: [
                    {
                        receiver: { $eq: req.body.public_key }
                    },
                    {
                        sender: { $eq: req.body.public_key }
                    }
                ]
            }
        }).then(rs => {
            return res.status(200).json({ data: rs })
        })
    }
}