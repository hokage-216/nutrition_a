const {User, Recipe, Favorites} = require('../models/index');
const userSeeds = require('./userSeeds');
const recipeSeeds = require('./recipeSeeds');
const favoriteSees = require('./favoriteSeeds');

async function seedDatabase () {
  try {
    await User.bulkCreate(userSeeds);
    console.log('Users seeded successfully!');
  
    await Recipe.bulkCreate(recipeSeeds);
    console.log('Recipe seeded successfully!');

    await Favorites.bulkCreate(favoriteSees);
    console.log('Favorites seeded successfully!');

  } catch (error) {
    console.error('Failed to seed:', error);
  }
};

module.exports = seedDatabase;