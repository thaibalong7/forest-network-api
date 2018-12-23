'use strict';
module.exports = (sequelize, DataTypes) => {
    var followings = sequelize.define('followings', {
        follower: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        followed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'followings',
            timestamps: false
        });
    return followings;
};