import RecipeModel from '../models/recipemodel.js';
import RecipeView from '../viewrecipes/public/recipeviews.js';


class RecipeController {
    constructor(apiKey) {
        this.recipeModel = new RecipeModel(apiKey);
        this.recipeView = new RecipeView();
        this.bindRecipeListClick();
    }

    async searchRecipes(query) {
        const results = await this.recipeModel.searchRecipes(query);
        this.recipeView.displaySearchResults(results);
    }

    async viewRecipe(recipeId) {
        const recipe = await this.recipeModel.getRecipeDetails(recipeId);
        this.recipeView.displayRecipeDetails(recipe);
    }

    bindRecipeListClick() {
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.addEventListener('click', async (event) => {
            if (event.target.classList.contains('view-recipe')) {
                const recipeId = event.target.dataset.id;
                await this.viewRecipe(recipeId);
            }
        });
    }
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

export default RecipeController;