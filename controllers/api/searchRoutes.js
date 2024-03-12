
const express = require('express');
const axios = require('axios');
const Recipe = require('../../models/Recipe');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('dashboard', {showSearch: true});
});

router.get('/:query', async (req, res) => {
  try {
    const { query } = req.params.query;
    const apiKey = '6e6eb5f009de4797a891962aba8e1d54'; 
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);

    const recipesData = response.data.results;
    const recipes = recipesData.map(recipeData => new Recipe(
      recipeData.title,
      recipeData.ingredients,
      recipeData.instructions
    ));
    res.render('recipes', { recipes });
  } catch (error) {
    res.status(500).send('Error fetching recipes');
  }
});

module.exports = router; 

