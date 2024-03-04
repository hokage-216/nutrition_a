const Meal = require('./meal');

const DailyMealPlan = require('./DailyMealPlan');

Meal.hasMany(DailyMealPlan, {
  foreignKey: 'breakfastId',
  onDelete: 'SET NULL', // Set the breakfastId to NULL if the associated meal is deleted
});

Meal.hasMany(DailyMealPlan, {
  foreignKey: 'lunchId',
  onDelete: 'SET NULL', // Set the lunchId to NULL if the associated meal is deleted
});

Meal.hasMany(DailyMealPlan, {
  foreignKey: 'dinnerId',
  onDelete: 'SET NULL', // Set the dinnerId to NULL if the associated meal is deleted
});


module.exports = { Meal, DailyMealPlan };