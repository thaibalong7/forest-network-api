const settings = require('../../setting');
var Sequelize = require("sequelize");
var config = settings.databaseConfig;
var sequelize = new Sequelize(config)

sequelize.authenticate()
  .then(() => console.log('Connect database success!!'))
  .catch(err => console.log(err.message));

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../model/user.js')(sequelize, Sequelize);
db.payments = require('../model/payments.js')(sequelize, Sequelize);
db.followings = require('../model/followings.js')(sequelize, Sequelize);
db.transactions = require('../model/transactions.js')(sequelize, Sequelize);

module.exports = db;