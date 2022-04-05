const meals = document.getElementById('meals')

getRandomMeal()
fetchFavMeals()

async function getRandomMeal(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const result = await response.json()
    const randomMeal = result.meals[0]
    console.log(randomMeal)

    addMeal(randomMeal, true)
}

async function getMealById(id){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
    const result = await response.json()
    const meal = result.meals[0]
    return meal
}

async function getMealsBySearch(name){
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name)
}

function addMeal(mealData, random = false){
    const meal = document.createElement('div')
    meal.classList.add('meal')

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random"> Random Recipe </span>` : ""}
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `

    meals.appendChild(meal)

    const favButton = meal.querySelector('.meal-body .fav-btn')
    favButton.addEventListener('click', () => {
        if (favButton.classList.contains('acitve')){
            removeMealsFromLs(mealData.idMeal)
            favButton.classList.remove('active')
        }else{
            addMealsToLS(mealData.idMeal)
            favButton.classList.add('active')
        }
    })

}

function addMealsToLS(mealId) {
    const mealIds = getMealsFromLS()
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealsFromLs(mealId) {
    const mealIds = getMealsFromLS()

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)))
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds === null ? [] : mealIds
}

async function fetchFavMeals(){
    const mealIds = getMealsFromLS()

    const meals = []

    for (let i=0; i<mealIds.length; i++){
        const mealId = mealIds[i]
        meal = await getMealById(mealId)
        meals.push(meal)
    }

    console.log(meals)
}