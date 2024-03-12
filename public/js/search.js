// const axios = require('axios');

const apiKey = '6e6eb5f009de4797a891962aba8e1d54'; 

// document.getElementById('search-btn').addEventListener('click', async () => {
//     const search = document.getElementById('search').value;
//     try {
//         const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${apiKey}`);
//         const data = response.json();

//         if (response.ok) {
//             console.log(data);
//             console.log('Database Updates Succesfully');
//           }
//     } catch (error) {
//         console.log('Error running search: ', error);
//         alert(response);
//     }
// });


// Function to perform recipe search and display results
async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            // Clear previous results
            document.getElementById('recipeList').innerHTML = '';
            // Display recipe titles
            data.results.forEach(recipe => {
                const li = document.createElement('li');
                li.textContent = recipe.title;
                document.getElementById('recipeList').appendChild(li);
            });
        } else {
            console.error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// Function to handle search button click
document.getElementById('search-btn').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value;
    searchRecipes(searchQuery);
});