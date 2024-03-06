import RecipeController from './recipecontroller.js';

const apiKey = '6e6eb5f009de4797a891962aba8e1d54'; // Replace with your actual Spoonacular API key

const recipeController = new RecipeController(apiKey);

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value;
    recipeController.searchRecipes(query);
});

