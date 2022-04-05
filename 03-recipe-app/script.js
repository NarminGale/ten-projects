async function getRandomMeal(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const result = await response.json()
    const randomMeal = result.meals[0]
}

getRandomMeal()

async function getMealById(id){
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)

}

async function getMealsBySearch(name){
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name)
}

