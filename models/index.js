const Sequelize = require('sequelize');
const sequelize = require('../config/connection');


const UserModel = require('./User');
const MealModel = require('./Meal');


const User = new UserModel(sequelize, Sequelize);
const Meal = new  MealModel(sequelize, Sequelize);


User.hasMany(Meal, {
  foreignKey: 'userId', 
});



module.exports = {
  User,
  Meal,
};