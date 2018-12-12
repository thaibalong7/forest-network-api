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

db.user = require('../model/user.js')(sequelize, Sequelize);

module.exports = db;