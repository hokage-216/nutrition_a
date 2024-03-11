const express = require('express');
const router = express.Router();
const { Meal } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard', {showPlanner: true});
});

// create/add meal in/to our db
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
