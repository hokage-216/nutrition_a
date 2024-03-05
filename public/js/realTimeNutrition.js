

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nutritionForm');
  
    form.addEventListener('input', function() {

      const age = document.getElementById('age').value;
      const weight = document.getElementById('weight').value;
      const sex = document.getElementById('sex').value;
      const height = document.getElementById('height').value;
      const activityLevel = document.getElementById('activity-level').value;
      const targetWeight = document.getElementById('target-weight').value;

      // Perform validation
      if (age < 13 || weight < 75) { // Example validation
        alert('Age or weight not suitable for this application.');
        return;
      }
      // Perform calculations (simplified example)
      const calories = calculateCalories(age, weight);
      document.getElementById('calories').textContent = calories;
    });
  
    function calculateCalories(age, weight) {
      // Insert calculation logic here
      return 2000; // Placeholder value
    }
  });