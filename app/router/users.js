const user = require('../controller/users');

module.exports = function (app) {
    app.post('/user/login', user.login);
    app.get('/user/getName/:id', user.getName);

}