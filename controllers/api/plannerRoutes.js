const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Meal } = require('../../models');

router.post('/save-meals', async (req, res) => {
  try {
    const mealPlan = req.body;

    
    const savedMeals = await Meal.bulkCreate(mealPlan);

    res.status(200).json(savedMeals);
  } catch (error) {
    console.error('Error saving meals:', error);
    res.status(500).json({ error: 'Failed to save meals' });
  }
});

module.exports = router;
