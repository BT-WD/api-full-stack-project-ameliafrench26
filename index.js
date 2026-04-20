const key = "1";
const randomURL = `https://www.themealdb.com/api/json/v1/${key}/random.php`;
const btn = document.getElementById("generate-btn");


const getRecipe = async () => {
    try {
        const response = await fetch(randomURL);
        const data = await response.json();

        const meal = data.meals[0];

        console.log("Recipe name:", meal.strMeal);
        console.log("Category:", meal.strCategory);
        console.log("Instructions:", meal.strInstructions);
        console.log("Image:", meal.strMealThumb);

        // Example: display in DOM
        document.getElementById("recipe").innerHTML = `
            <h2 id="recipe-title">${meal.strMeal}</h2>
            <img id="random-img" src="${meal.strMealThumb}" width="200"/>
            <p id="recipe-body">${meal.strInstructions}</p>
        `;
    } catch (error) {
        console.error("Error fetching recipe:", error);
    }
};

btn.addEventListener("click", () => {
    console.log('clicked');
    getRecipe();
});