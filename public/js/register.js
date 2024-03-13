
const submitFormHandler = async (event) => {
  try {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect user data from form fields
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const first_name = document.querySelector('#fname').value;
    const last_name = document.querySelector('#lname').value;
    const sex = document.querySelector('#sex').value;
    const activity_level = Number (document.querySelector('#activity-level').value);
    let age = Number(document.querySelector('#age').value);
    let weight = Number(document.querySelector('#weight').value);
    let height_ft = Number (document.querySelector('#height-ft').value);
    let height_in = Number (document.querySelector('#height-in').value);
    let target_calories;

    // Create the request body
    let userData = {
      email,
      password,
      first_name,
      last_name,
      sex,
      height_ft,
      height_in,
      weight,
      age,
      activity_level
    };

    // Calculate Calories
    target_calories = calculateCalories(userData.age, userData.weight, userData.sex, userData.height_ft, userData.height_in, userData.activity_level);
    console.log(target_calories);

    // Calculate Macros
    const {fatGrams, carbGrams, proteinGrams} = calculateMacros(target_calories);

    newUser = {
      ...userData,
      target_calories: Number(target_calories.toFixed(0)),
      target_fat: Number(fatGrams.toFixed(0)),
      target_carbs: Number (carbGrams.toFixed(0)),
      target_proteins: Number (proteinGrams.toFixed(0)),
    };

    console.log(newUser);

    const response = await fetch('/api/users/createUser', {
      method: 'POST', // Specify the method
      headers: {
          'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(newUser), // Convert the JavaScript object to a JSON string

    });

    console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } 
  } catch (error) {
    alert('Failed to log in', error);
  }
};

document.querySelector('#register-form').addEventListener('submit', submitFormHandler);
