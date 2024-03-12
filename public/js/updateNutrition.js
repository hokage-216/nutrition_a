document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('nutrition-form');
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value; // in pounds
  const sex = document.getElementById('sex').value;
  const height_ft = document.getElementById('height-ft').value;
  const height_in = document.getElementById('height-in').value;
  const activity_level = document.getElementById('activity-level').value;
  const submit = document.getElementById('submit');

  const userData = {
    email,
    password,
    first_name,
    last_name,
    sex,
    height_ft,
    height_in,
    weight,
    age,
    activity_level,
    target_calories,
    target_fat,
    target_carbs,
    target_proteins,
  };

  function calculateAndUpdateNutritionGoals() {
    
    // Calculate Calories
    userData[10] = calculateCalories(userData.age, userData.weight, userData.sex, userData.height_ft, userData.height_in, userData.activity_level);
    console.log(userData[10]);

    // Calculate Macros
    userData[11, 12, 13] = calculateMacros(userData[10]);
    console.log(userData[11, 12, 13]);

    console.log(userData);

    // Age validation
    if (18 < age > 100) {
        alert('Age not suitable for this application.');
        return;
    }

    // Weight validation
    if (75 < weight > 500) {
        alert('Weight not suitable for this application.');
        return;
    }

    // Calorie calculation: Calculates average calories burned per day based on activity level
    const calories = calculateCalories(age, weight, sex, height_ft, height_in, activity_level);
    document.getElementById('calories').textContent = calories.toFixed(0);

    // Example of calculating macros (simplified)
    const { proteinGrams, fatGrams, carbGrams } = calculateMacros(calories);
    // Update UI with calculated values
    document.getElementById('protein').textContent = proteinGrams.toFixed(0) + 'g';
    document.getElementById('fats').textContent = fatGrams.toFixed(0) + 'g';
    document.getElementById('carbs').textContent = carbGrams.toFixed(0) + 'g';
    }

  form.addEventListener('blur', function(event) {
      // Trigger calculations when the user clicks away from an input field
      if (event.target.tagName === 'INPUT') {
          calculateAndUpdateNutritionGoals();
      }
  }, true); // Use capturing to catch the event

  submit.addEventListener('click', () => {
    try {
      fetch('/api/userRoutes/updateNutrition');
      alert('Sign Up Successful!');
    } catch (error) {
      alert('Error updating the server. Try again!');
      console.log(error);
    }
  });

});
