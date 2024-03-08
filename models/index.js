const Sequelize = require('sequelize');
const sequelize = require('../config/connection');


const UserModel = require('./User');
const MealModel = require('./Meal');
const DailyMealPlanModel = require('./DailyMealPlan');
const RecipeModel = require('./Recipe');

const User = new UserModel(sequelize, Sequelize);
const Meal = new  MealModel(sequelize, Sequelize);
const DailyMealPlan = new DailyMealPlanModel(sequelize, Sequelize);
const Recipe = new RecipeModel(sequelize, Sequelize);

// User.hasMany(DailyMealPlan, {
//   foreignKey: 'userId', 
// });

// DailyMealPlan.belongsTo(User, {
//   foreignKey: 'userId', 
// });

// DailyMealPlan.belongsTo(Meal, {
//   foreignKey: 'breakfastId', 
//   as: 'breakfast' 
// });

// DailyMealPlan.belongsTo(Meal, {
//   foreignKey: 'lunchId', 
//   as: 'lunch' 
// });

// DailyMealPlan.belongsTo(Meal, {
//   foreignKey: 'dinnerId', 
//   as: 'dinner' 
// });

// Meal.hasOne(Recipe, {
//   foreignKey: 'mealId', 
// });

// Recipe.belongsTo(Meal, {
//   foreignKey: 'mealId', 
// });


module.exports = {
  User,
  Meal,
  DailyMealPlan,
  Recipe,
};