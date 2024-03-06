class RecipeView {
    constructor() {
        this.searchResultsContainer = document.getElementById('search-results');
        this.recipeDetailsContainer = document.getElementById('recipe-details');
    }

    displaySearchResults(recipe) {
        this.searchResultsContainer.innerHTML = '';

        if (recipe.length === 0) {
            this.searchResultsContainer.innerHTML = 'No results found.';
            return;
        }

        recipe.forEach(recipe => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('recipe');
            resultElement.innerHTML = `
                <div class="recipe-info">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    
                    <button data-id="${recipe.id}" class="view-recipe">View Recipe</button>
                </div>
            `;
            this.searchResultsContainer.appendChild(resultElement);
        });
    }

    displayRecipeDetails(recipe) {
        this.recipeDetailsContainer.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${recipe.summary}</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
        `;
        this.recipeDetailsContainer.style.display = 'block';
    }
}

// Export the RecipeView class
export default RecipeView;
