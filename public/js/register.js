const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

    
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  document.querySelector('#login').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect user data from form fields
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const first_name = document.querySelector('#fname').value;
    const last_name = document.querySelector('#lname').value;
    const sex = document.querySelector('#sex').value;
    const age = document.querySelector('#age').value;
    const weight = document.querySelector('#weight').value;
    const height_ft = document.querySelector('#height-ft').value;
    const height_in = document.querySelector('height-in').value;
    const activity_level = document.querySelector('activity-level').value;

    // Create the request body
    const userData = {
        email,
        password,
        first_name,
        last_name,
        sex,
        age,
        weight,
        height_ft,
        height_in,
        activity_level
    };

    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(userData), // Convert the JavaScript object to a JSON string
        });

        if (response.ok) {
            // Handle success, e.g., redirecting the user or displaying a success message
            console.log('Signup successful');
        } else {
            // Handle server-side validation errors or other issues
            const errorData = await response.json();
            console.error('Signup failed:', errorData);
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error making signup request:', error);
    }
});
