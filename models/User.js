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
    body_fat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activity_level: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    target_calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diet_pref: {
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
    exclude_cuisines: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    intolerances: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
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
