const key = "1";
const randomURL = `https://www.themealdb.com/api/json/v1/${key}/random.php`;
const btn = document.getElementById("generate-btn");
const searchForm = document.querySelector("form");
const searchInput = document.getElementById("site-search");

const searchRecipe = async (query) => {
    const searchURL = `https://www.themealdb.com/api/json/v1/${key}/search.php?s=${query}`;

    try {
        const response = await fetch(searchURL);
        const data = await response.json();

        if (!data.meals) {
            document.getElementById("recipe-search").innerHTML = `
                <p>No recipes found for "${query}"</p>
            `;
            return;
        }

        const meal = data.meals[0]; // show first result

        document.getElementById("recipe-search").innerHTML = `
            <h2 id="recipe-title">${meal.strMeal}</h2>
            <img id="random-img" src="${meal.strMealThumb}" width="200"/>
            <p id="recipe-body">${meal.strInstructions}</p>
        `;
    } catch (error) {
        console.error("Error searching recipe:", error);
    }
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
        searchRecipe(query);
    }
});

const getRecipe = async () => {
    try {
        const response = await fetch(randomURL);
        const data = await response.json();

        const meal = data.meals[0];

        console.log("Recipe name:", meal.strMeal);
        console.log("Category:", meal.strCategory);
        console.log("Instructions:", meal.strInstructions);
        console.log("Image:", meal.strMealThumb);

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