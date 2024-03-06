const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Recipe = sequelize.define('Recipe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sourceUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Recipe;
