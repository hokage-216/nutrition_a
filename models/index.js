const Sequelize = require('sequelize');
const sequelize = require('../config/connection');


const User = require('./User');
const Meal = require('./Meal');


User.hasMany(Meal, {
  foreignKey: 'mealId', 
});

module.exports = { User, Meal };