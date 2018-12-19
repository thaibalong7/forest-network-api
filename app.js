var express = require('express');
var bodyParser = require('body-parser');
const db = require('./app/config/db.config');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.sequelize.sync();
var server_port = process.env.YOUR_PORT || process.env.PORT || 9000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
require('./app/router/users')(app);
require('./app/router/payments')(app);
require('./app/router/posts')(app);
var server = app.listen(server_port, server_host, function () {
    console.log(`App listening at port ${server_port}`)
});

module.exports = server;