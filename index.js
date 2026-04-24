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



btn.addEventListener("click", () => {
    console.log('clicked');
    getRecipe();
});


// Variable to store the currently displayed recipe object
let currentRecipe = null;

// Modified getRecipe to store the data globally
const getRecipe = async () => {
    try {
        const response = await fetch(randomURL);
        const data = await response.json();
        const meal = data.meals[0];

        // Store this for Local Storage use
        currentRecipe = {
            name: meal.strMeal,
            image: meal.strMealThumb,
            instructions: meal.strInstructions
        };

        document.getElementById("recipe").innerHTML = `
            <h2 id="recipe-title">${meal.strMeal}</h2>
            <img id="random-img" src="${meal.strMealThumb}" width="200"/>
            <p id="recipe-body">${meal.strInstructions}</p>
        `;
    } catch (error) {
        console.error("Error fetching recipe:", error);
    }
};

// --- Local Storage Logic ---

const saveBtn = document.getElementById("save-recipe-btn");
const favoritesList = document.getElementById("favorites-list");

// Function to save to Local Storage
saveBtn.addEventListener("click", () => {
    if (!currentRecipe) return alert("Generate a recipe first!");

    // 1. Get existing favorites or an empty array
    const favorites = JSON.parse(localStorage.getItem("myRecipes")) || [];

    // 2. Add the new recipe
    favorites.push(currentRecipe);

    // 3. Save back to Local Storage
    localStorage.setItem("myRecipes", JSON.stringify(favorites));

    displayFavorites();
});

// Function to display favorites from Local Storage
const displayFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("myRecipes")) || [];
    favoritesList.innerHTML = favorites.map(recipe => `
        <li style="border-bottom: 1px solid #EE6C4D; margin-bottom: 10px;">
            <strong>${recipe.name}</strong>
        </li>
    `).join("");
};

// Load favorites on page startup
window.onload = displayFavorites;