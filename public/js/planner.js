document.getElementById('generateMealsBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('/dailymeal', { method: 'GET' });
    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error('Error generating daily meals:', error);
  }
});