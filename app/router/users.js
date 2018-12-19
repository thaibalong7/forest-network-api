const user = require('../controller/users');

module.exports = function (app) {
    app.post('/user/login', user.login);


}