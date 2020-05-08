// Getting API from: https://www.themealdb.com/api.php, look under 'search meal by name
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

const mealAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // get the search term
  const term = search.value;

  // Checking for empty
  if (term.trim()) {
    fetch(`${mealAPI}${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Setting the Search Result string
        resultHeading.innerHTML = `<h2>Search Result For '${term}': </h2>`;

        // Check if there is a result for the search term or not
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again !</p>`;
        } else {
          // getting the output of different meals and list it
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `
            )
            .join("");
        }
      });
    // Clear search Text
    search.value = "";
  } else {
    alert("Please Enter Your Meal !");
  }
}

// Fetch meal by ID
// Getting API from: https://www.themealdb.com/api.php, look under 'Look up full details by ID'
const mealIDapi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
function getMealById(mealID) {
  fetch(`${mealIDapi}${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredient = [];

  // Filling array with ingredient and mesasurement
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      // see data array > object to for reference
      ingredient.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );

      single_mealEl.innerHTML = `
        <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
            ${ingredient.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
        </div>
        </div>
    `;
    } else {
      break;
    }
  }
}

// Event Listener for Search Meal
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  // console.log(mealInfo);

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
