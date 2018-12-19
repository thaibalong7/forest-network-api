'use strict';
module.exports = (sequelize, DataTypes) => {
    var payments = sequelize.define('payments', {
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        createAt: {
            type: DataTypes.DATE,
        },
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'payments',
            timestamps: false
        });
    return payments;
};