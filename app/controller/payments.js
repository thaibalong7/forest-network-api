const db = require('../config/db.config.js')
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
exports.getPaymentById = async (req, res) => {
    if (isNaN(req.params.per_page) || isNaN(req.params.page)) {
        res.status(401).json({ msg: "Params is invalid" });
    }
    else {
        const account = await db.users.findByPk(req.params.id)
        if (!account) {
            return res.status(400).json({ msg: 'Account does not exists' })
        }
        else {
            const per_page = parseInt(req.params.per_page);
            const page = parseInt(req.params.page)
            console.log(per_page, page)
            db.payments.findAndCountAll({
                where: {
                    [Op.or]: [{
                        receiver: req.params.id
                    },
                    {
                        sender: req.params.id
                    }]
                },
                order: [['createAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page
            }).then(async (rs) => {
                console.log(rs)
                //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
                var next_page = parseInt(req.params.page) + 1;
                //Kiểm tra còn dữ liệu không
                if ((parseInt(rs.rows.length) + (next_page - 2) * parseInt(req.params.per_page)) === parseInt(rs.count))
                    next_page = -1;
                return res.status(200).json({
                    itemCount: rs.rows.length, //số lượng record được trả về
                    data: rs.rows,
                    next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
                })
            })
        }
    }
}