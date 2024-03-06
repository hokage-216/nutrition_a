const Recipe = require('../models/Recipe');

class RecipeController {
    async addFavorite(recipeData) {
        try {
            const recipe = await Recipe.create(recipeData);
            return recipe;
        } catch (error) {
            console.error('Error adding favorite recipe:', error);
            throw new Error('Error adding favorite recipe');
        }
    }

    async getFavorites() {
        try {
            const favorites = await Recipe.findAll();
            return favorites;
        } catch (error) {
            console.error('Error retrieving favorite recipes:', error);
            throw new Error('Error retrieving favorite recipes');
        }
    }

    async addRecipeToFavorites(recipeData) {
        try {
            const recipe = await this.addFavorite(recipeData);
            console.log(`Added recipe ${recipe.title} to favorites.`);
            return recipe;
        } catch (error) {
            console.error('Error adding recipe to favorites:', error);
            throw new Error('Error adding recipe to favorites');
        }
    }
}

module.exports = RecipeController;
