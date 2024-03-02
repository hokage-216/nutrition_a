const axios = require('axios');
const { Meal } = require('./models'); 
const User = require('./models/User'); 

router.get('/daily-meals', async (req, res) => {
  try {
    const userId = req.user.id; 
    const exclusions = await User.getExclusions(userId);
    const diet = await User.getDiet(userId);

    const dietArray = (diet || '').split(',');
    const exclusionArray = (exclusions || '').split(',');

    let dietParams = '';
    let excludeParams = '';

    for  (const diet of dietArray){
      dietParams += diet + ',';
    }
    for (const exclusion of exclusionArray) {
      excludeParams += exclusion + ',';
    }

    excludeParams = excludeParams.slice(0, -1);
    dietParams = dietParams.slice(0, -1);
    const targetCalories = req.query;

    
    const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
      params: {
        apiKey: '7d85257ebcaf459aa43aa1e89e85246e',
        timeFrame: 'day',
        exclude: exclusions || undefined,
        diet: diet || undefined,
        targetCalories: targetCalories || undefined,
        
      }
    });

    const { breakfast, lunch, dinner } = response.data;

    await Promise.all([
      Meal.bulkCreate(breakfast, { ignoreDuplicates: true }),
      Meal.bulkCreate(lunch, { ignoreDuplicates: true }),
      Meal.bulkCreate(dinner, { ignoreDuplicates: true })
    ]);

    res.json({ message: 'Daily meals stored in database successfully' });
  } catch (error) {
    console.error('Error fetching daily meals:', error.message);
    res.status(500).json({ error: 'Failed to fetch and store daily meals' });
  }
});





