const RecipeModel = require('./recipemodels');
const FavoriteModel = require('./favoritemodel');

class RecipeController {
  // Existing methods...

  async addFavorite(userId, recipeId) {
    try {
      const favorite = await FavoriteModel.create({ userId, recipeId });
      return favorite;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return null;
    }
  }

  async getFavorites(userId) {
    try {
      const favorites = await FavoriteModel.findAll({
        where: { userId },
        include: RecipeModel,
      });
      return favorites;
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }
}

module.exports = RecipeController;
