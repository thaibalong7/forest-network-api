const followings = require('../controller/followings');

module.exports = function (app) {
   app.get('/followings/getAllFollowings/:id', followings.getAllFollowings);
   app.get('/followings/getAllFollowers/:id', followings.getAllFollowers);
   app.get('/followings/getNumOfFollowed/:id', followings.getNumOfFollowed);
   app.get('/followings/getNumOfFollower/:id', followings.getNumOfFollower);
}