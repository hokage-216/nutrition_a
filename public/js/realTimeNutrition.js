document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('nutrition-form');
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value; // in pounds
  const male = document.getElementById('male').value;
  const height_ft = document.getElementById('height-ft').value;
  const height_in = document.getElementById('height-in').value;
  const activity_level = document.getElementById('activity-level').value;
  const submit = document.getElementById('submit');

  function calculateAndUpdateNutritionGoals() {
    
    function calculateCalories(age, weight, male, height_ft, height_in, activity_level) {
      
      const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extra_active: 1.9,
      };

      // convert weight from pounds to kilograms
      const weight_kg = weight * 0.453592;

      // convert height to cm
      const height_cm = (height_ft * 30.48) + (height_in * 2.54); 

      let bmr;
      if (male) {
          bmr = 88.362 + (13.397 * weight_kg) + (4.799 * height_cm) - (5.677 * age);
      } else {
          bmr = 447.593 + (9.247 * weight_kg) + (3.098 * height_cm) - (4.330 * age);
      }
      
      return bmr * (activityMultipliers[activity_level] || 1.2);
    }

    function calculateMacros(calories) {
      const proteinCalories = calories * 0.3;
      const fatCalories = calories * 0.3;
      const carbCalories = calories * 0.4;

      const proteinGrams = proteinCalories / 4;
      const fatGrams = fatCalories / 9;
      const carbGrams = carbCalories / 4;

      return { proteinGrams, fatGrams, carbGrams };
    }

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
    const calories = calculateCalories(age, weight, male, height_ft, height_in, activity_level);
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



});
