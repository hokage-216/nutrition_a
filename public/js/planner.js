const apiKey = '7d85257ebcaf459aa43aa1e89e85246e';

async function fetchMealPlan() {
  console.log('Fetching meal plan');
  const url = 'https://api.spoonacular.com/mealplanner/generate?apiKey=';
  const timeFrame = 'day';
  try{
    const response = await fetch(`${url}${apiKey}&timeFrame=${timeFrame}`);
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched meal plan data:', data);
    return data;
  }catch (error){
    console.log('There was a problem with the fetch operation', error);
  }};
 

  
  async function getRecipeDetails(recipeId) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched recipe details:', data); 
        return data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return null;
    }
}

  
  document.getElementById('generate-button').addEventListener('click', async()=>{
    console.log('Button clicked');
     const  mealPlan = await fetchMealPlan();
     console.log('Fetched meal plan:', mealPlan);
    displayMealPlan(mealPlan);
  })
  
  
    
    async function displayMealPlan(mealPlan) {
      console.log('Displaying meal plan:', mealPlan);
  
      const breakfastMeal = mealPlan.meals[0];
      const lunchMeal = mealPlan.meals[1];
      const dinnerMeal = mealPlan.meals[2];
  
      displayMeals([breakfastMeal], 'breakfast');
      displayMeals([lunchMeal], 'lunch');
      displayMeals([dinnerMeal], 'dinner');
  }

  async function displayMeals(meals, mealType) {
    const mealElement = document.getElementById(mealType);
    mealElement.innerHTML = '';

    for (let meal of meals) {
        const mealTitle = document.createElement('p');
        mealTitle.textContent = mealType.charAt(0).toUpperCase() + mealType.slice(1) + ': ' + meal.title;
        mealTitle.classList.add('text-light');
        mealElement.appendChild(mealTitle);

        const recipeDetails = await getRecipeDetails(meal.id);
        if (recipeDetails) {
            const imageLinkElement = document.createElement('a');
            imageLinkElement.href = recipeDetails.sourceUrl;
            imageLinkElement.target = '_blank';
            mealElement.appendChild(imageLinkElement);

            const imageElement = document.createElement('img');
            imageElement.src = recipeDetails.image;
            imageElement.alt = meal.title + ' Image';
            imageLinkElement.appendChild(imageElement);
        } else {
            const imageElement = document.createElement('img');
            imageElement.src = '';
            imageElement.alt = 'Placeholder Image';
            mealElement.appendChild(imageElement);
        }
    }
}


const saveMealsUrl = '/api/planner/save-meals';


document.getElementById('save-button').addEventListener('click', async () => {
  try {
    const mealPlan = await fetchMealPlan();

    const response = await fetch('/api/planner/save-meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealPlan),
    });

    if (response.ok) {
      console.log('Meals saved successfully');
    } else {
      console.error('Failed to save meals');
    }
  } catch (error) {
    console.error('Error saving meals:', error);
  }
});







     
