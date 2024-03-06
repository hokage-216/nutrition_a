class RecipeModel {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async searchRecipes(query) {
        const url = `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${this.apiKey}&number=10`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching search results:', error);
            return [];
        }
    }

    async getRecipeDetails(recipeId) {
        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            return null;
        }
    }
}

// Export the RecipeModel class
export default RecipeModel;
