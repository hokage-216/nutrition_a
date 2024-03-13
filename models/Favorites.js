const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorites extends Model {}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        model: 'recipe',
        key: 'id',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites',
  }
);

module.exports = Favorites;