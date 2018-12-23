const payments = require('../controller/payments');

module.exports = function (app) {
   app.get('/payment/getPaymentById/:id&:per_page&:page', payments.getPaymentById);

}