'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('users', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        sequence: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        bandwidth: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        // Last transaction date for bandwidth calculate
        bandwidthTime: {
            type: DataTypes.DATE,
        },
        balance: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        }

    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'users',
            timestamps: false
        });
    return user;
};