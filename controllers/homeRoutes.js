const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dailymeal', async (req, res)=>{
  const userId = req.session.user_id;
  const user = await User.findByPk(userId);

  const { diet_pref, target_calories, intolerances } = user;

  const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
    params: {
      apiKey: '7d85257ebcaf459aa43aa1e89e85246e',
      timeFrame: 'day',
      exclude: intolerances || undefined,
      diet: diet_pref || undefined,
      targetCalories: target_calories || undefined,
      
    }
  });


  const dailyMeal = {
    breakfast: response.data.meals[0], 
    lunch: response.data.meals[1], 
    dinner: response.data.meals[2], 
  }
  console.log(dailyMeal);

  const breakfastId = dailyMeal.breakfast.id;
    const lunchId = dailyMeal.lunch.id;
    const dinnerId = dailyMeal.dinner.id;

    const response2 = await Promise.all([
      axios.get(`https://api.spoonacular.com/recipes/${breakfastId}/information`),
      axios.get(`https://api.spoonacular.com/recipes/${lunchId}/information`),
      axios.get(`https://api.spoonacular.com/recipes/${dinnerId}/information`)
    ]);

    const recipeInfo = response2.map((res) => {
      return {
        image: res.data.image
      };
    });

  res.render('generate_mealplan', {dailyMeal, recipeInfo})
})



module.exports = router;