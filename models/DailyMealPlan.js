const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyMealPlan extends Model {}

DailyMealPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    breakfastId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id'
      }
    },
    lunchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id'
      }
    },
    dinnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'daily_meal_plan'
  }
);

module.exports = DailyMealPlan;
