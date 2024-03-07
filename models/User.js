const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
} 

User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height_ft: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height_in: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    activity_level: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    favorite_recipes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },
    cuisine_pref: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser;
      },
      beforeUpdate: async (updatedUser) => {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
            return updatedUser;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
