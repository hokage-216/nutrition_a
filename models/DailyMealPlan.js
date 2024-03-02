const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyMealPlan extends Model {}

DailyMealPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', 
        key: 'id',
      },
    },
    breakfastId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meal',
        key: 'id',
      },
    },
    lunchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meal',
        key: 'id',
      },
    },
    dinnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meal',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'daily_meal_plan',
    tableName: 'daily_meal_plans',
  }
);

module.exports = DailyMealPlan;
