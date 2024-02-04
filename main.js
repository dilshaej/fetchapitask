





const getRecipe = async () => {
    const dataInput = document.getElementById('dataInput').value;
        if (!dataInput) {
            alert('Please enter a dish name.');
            return;
        }
try{

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dataInput}`)
    const response = await data.json();
    response.meals.forEach(meal => {
      result.innerHTML += `
      <div class="col-lg-4 mb-3 div5">
        <div class="card" >
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strArea}</p>
                  <p class="card-text">${meal.strCategory}</p>
                  <button type="button" class="btn btn-dark" onclick="showRecipeModal('${meal.strMeal}')">View Recipe</button>
                </div>
              </div>
          </div>
      `
  
    
    })
        

   
   
}catch (err) {
                console.log(err);
            }
}

const showRecipeModal = async (mealName) => {
    // Fetch complete recipe details by meal name
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    const response = await data.json();
    const meal = response.meals[0];

    // Display recipe details in modal
    const recipeModal = document.getElementById('recipeModal');
    const recipeDetailsContent = document.querySelector('.recipe-details-content');
    recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>Area: ${meal.strArea}</p>
        <p>Category: ${meal.strCategory}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredientsList(meal)}
        </ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    `;

    // Show the modal
    recipeModal.style.display = 'block';
};

const getIngredientsList = (meal) => {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
};

const closeRecipeModal = () => {
    const recipeModal = document.getElementById('recipeModal');
    recipeModal.style.display = 'none';
};

const printRecipe = () => {
    // Add specific print functionality here, e.g., window.print()
    window.print();
};

// Call getRecipe function with some input (you can replace it with your dynamic input)
getRecipe('Chicken');
