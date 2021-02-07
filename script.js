const resultHeading = document.getElementById("result-heading");
const mealEl = document.getElementById("meal");
const singleMeal = document.getElementById("single-meal");

const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", searchMeals);


function searchMeals(e) {
    e.preventDefault();
    document.getElementById("single-meal").innerHTML = "";
    const term = document.getElementById("input").value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2> search for meal ${term} </h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2> There Are No Result For ${term} </h2>`;
                } else {
                    mealEl.innerHTML = data.meals.map(
                        meal => `
                    <div class="meals" data-mealID="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info">
                    <h3> ${meal.strMeal} </h3>
                    </div>
                    </div>
                    `
                    )
                        .join("");
                }
            });
    } else {
        alert("Please insert a value in search");
    }
}

// fetch meal by id 

function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const meal = data.meals[0];
            addMealToDOM(meal);
        });

}

//  add meal to dom 

function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]
                }`
            );
        } else {
            break;
        }

    }


    singleMeal.innerHTML = `
    <div class="single-meals">
    <h1> ${meal.strMeal} </h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info>
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p> ${meal.strArea}</p>` : ''}
    </div>
    <div class="mine">
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>
    `
}

mealEl.addEventListener("click", (e) => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains("meals");
        } else {
            return false;
        }
    })
    if (mealInfo) {
        const mealId = mealInfo.getAttribute("data-mealid");
        getMealById(mealId);
    }
})
