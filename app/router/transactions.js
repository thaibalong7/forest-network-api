const transactions = require('../controller/transactions');

module.exports = function (app) {
  app.get('/transactions/getTweetsInHome/:id&:per_page&:page', transactions.getTweetsInHome);
  app.get('/transactions/getTweetsInMe/:id&:per_page&:page', transactions.getTweetsInMe);
  app.get('/transactions/getNumOfTweetsById/:id', transactions.getNumOfTweetsById)
}