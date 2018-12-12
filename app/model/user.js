'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('users', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
              }
        },
        password: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
      
        userName: {
          type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        }

    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'users',
            timestamps: false
        });
    return user;
};