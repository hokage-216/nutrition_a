const express = require('express');
const router = express.Router();
const { Recipe } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard', {showPlanner: true});
});

// create/add meal in/to our db
router.post('/save-meals', async (req, res) => {
  try {
    const mealPlan = req.body.meals;
    console.log(mealPlan);

    for (const meal of mealPlan) {
      await Recipe.create(meal);
    }

    res.status(200).json();
  } catch (error) {
    console.error('Error saving meals:', error);
    res.status(500).json({ error: 'Failed to save meals' });
  }
});

// Route to handle retrieving meals for a specific date
router.get('/meals/:date', async (req, res) => {
  try {
    const date = req.query.date;
    const meals = await Recipe.findAll({
      where: {
        date: date 
      }
    });
    res.render('meals', { meals: meals, date: date }, {mealsdata: true}); 
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

module.exports = router;
