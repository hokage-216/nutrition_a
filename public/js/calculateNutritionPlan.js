const { User } = require('./models');

async function calculateNutritionPlan() {
  try {
    // Step 1: Fetch user data from the database
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found.');
      return;
    }

    const { height_ft, height_in, weight, age, sex, activity_level, target_calories } = user;
    const height_cm = (height_ft * 30.48) + (height_in * 2.54); // convert height to cm

    // Step 2: calculate BMR
    let bmr;
    if (sex === 'male') {
      bmr = 10 * weight + 6.25 * height_cm - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height_cm - 5 * age - 161;
    }

    // adjust BMR based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };

    const tdee = bmr * (activityMultipliers[activity_level] || 1.2); // use sedentary as default if activity level is not matched

    // use target_calories if specified, else use calculated TDEE
    const dailyCalories = target_calories || tdee;

    // Step 3: calculate macros based on caloric intake
    // macro split: 40% carbs, 30% protein, 30% fats
    const proteinCalories = dailyCalories * 0.3;
    const fatCalories = dailyCalories * 0.3;
    const carbCalories = dailyCalories * 0.4;

    // convert calories to grams
    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
    const carbGrams = carbCalories / 4;

    console.log(`Daily caloric intake: ${dailyCalories.toFixed(2)} calories`);
    console.log(`Proteins: ${proteinGrams.toFixed(2)}g`);
    console.log(`Fats: ${fatGrams.toFixed(2)}g`);
    console.log(`Carbs: ${carbGrams.toFixed(2)}g`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

mondule.export = calculateNutritionPlan;