'use strict';
module.exports = (sequelize, DataTypes) => {
    var posts = sequelize.define('posts', {
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createAt: {
            type: DataTypes.DATE,
        },
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'posts',
            timestamps: false
        });
    return posts;
};