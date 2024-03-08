
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User, meal, DailyMealPlan, Recipe } = require('../../models');




router.get('/dailymeal', async (req, res)=>{
  const userId = req.session.user_id;
  const user = await User.findByPk(userId);

  const { diet_pref, target_calories, intolerances } = user;

  const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
    params: {
      apiKey: '7d85257ebcaf459aa43aa1e89e85246e',
      timeFrame: 'day',
      // exclude: intolerances || undefined,
      diet: diet_pref || undefined,
      // targetCalories: target_calories || undefined,
      
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

router.post('/create-meal-plan', async (req, res) =>{
  try{
    const { userId, meals, breakfastResponse, lunchResponse, dinnerResponse } = req.body;
    
    const [breakfastMeal, lunchMeal, dinnerMeal] = await meal.bulkCreate(meals, { ignoreDuplicates: true });

    await Promise.all([
      Recipe.create({mealId: breakfastMeal.id, image: breakfastResponse.data.image}),
      Recipe.create({mealId: lunchMeal.id, image: lunchResponse.data.image}),
      Recipe.create({mealId: dinnerMeal.id, image: dinnerResponse.data.image})
    ]);
    await DailyMealPlan.create({
      userId: userId,
      breakfastId: breakfastMeal.id,
      lunchId: lunchMeal.id,
      dinnerId: dinnerMeal.id
    });
    res.render('generate_mealplan', {
      dailyMeal: {
        breakfast: breakfastMeal,
        lunch: lunchMeal,
        dinner: dinnerMeal
      }
    });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    res.status(500).json({ error: 'Failed to create meal plan' });
  }
});

module.exports = router;