const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meal extends Model {}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal'
  }
);

module.exports = Meal;
