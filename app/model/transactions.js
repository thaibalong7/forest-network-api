'use strict';
module.exports = (sequelize, DataTypes) => {
    var transactions = sequelize.define('transactions', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        operation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        params: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        createAt: {
            type: DataTypes.DATE,
        },
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'transactions',
            timestamps: false
        });
    return transactions;
};