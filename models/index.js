

DailyMealPlan.hasMany(Recipes, {
  foreignKey: 'breakfastId',
  onDelete: 'SET NULL', // Set the breakfastId to NULL if the associated meal is deleted
});

DailyMealPlan.hasMany(Recipes, {
  foreignKey: 'lunchId',
  onDelete: 'SET NULL', // Set the lunchId to NULL if the associated meal is deleted
});

DailyMealPlan.hasMany(Recipes, {
  foreignKey: 'dinnerId',
  onDelete: 'SET NULL', // Set the dinnerId to NULL if the associated meal is deleted
});
