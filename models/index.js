const User = require('./User');
const Recipe = require('./Recipe');
const Favorites = require('./Favorites')

User.belongsToMany(Recipe, { through: Favorites });
Recipe.belongsToMany(User, { through: Favorites });

module.exports = { User, Recipe, Favorites };