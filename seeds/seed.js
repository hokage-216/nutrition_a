const {User, Recipe} = require('../models/index');
const userSeeds = require('./userSeeds');
const recipeSeeds = require('./recipeSeeds');

async function seedDatabase () {
  try {
    await User.bulkCreate(userSeeds);
    console.log('Departments seeded successfully!');
  
    await Recipe.bulkCreate(recipeSeeds);
    console.log('Roles seeded successfully!');

  } catch (error) {
    console.error('Failed to seed:', error);
  }
};

module.exports = seedDatabase;