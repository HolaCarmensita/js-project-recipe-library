const recipesContainer = document.querySelector('.recipes-container');
const filtersContainer = document.querySelector('.filters-container');
const sortSelect = document.getElementById('sort-select');
const surpriseButton = document.getElementById('random-recipe-btn');
const includedCuisines =
  'italian,mediterranean,middle eastern,asian,mexican,european';
const excludedCuisines = [
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
];
const searchEndPoint = 'https://api.spoonacular.com/recipes/complexSearch';
const bulkEndPoint = 'https://api.spoonacular.com/recipes/informationBulk';
const API_KEY = '649bf6cc7ba345bba9a1a0cabc1c7c65';

let visibleRecipes = [];

const RECIPES = [
  {
    id: 1,
    title: 'Vegan Lentil Soup',
    image: './chicken.webp',
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: 'https://example.com/vegan-lentil-soup',
    diets: ['vegan'],
    cuisine: 'Mediterranean',
    ingredients: [
      'red lentils',
      'carrots',
      'onion',
      'garlic',
      'tomato paste',
      'cumin',
      'paprika',
      'vegetable broth',
      'olive oil',
      'salt',
    ],
    pricePerServing: 2.5,
    popularity: 85,
  },
  {
    id: 2,
    title: 'Vegetarian Pesto Pasta',
    image: './chicken.webp',
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: 'https://example.com/vegetarian-pesto-pasta',
    diets: ['vegetarian'],
    cuisine: 'Italian',
    ingredients: [
      'pasta',
      'basil',
      'parmesan cheese',
      'garlic',
      'pine nuts',
      'olive oil',
      'salt',
      'black pepper',
    ],
    pricePerServing: 3.0,
    popularity: 92,
  },
  {
    id: 3,
    title: 'Gluten-Free Chicken Stir-Fry',
    image: './chicken.webp',
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: 'https://example.com/gluten-free-chicken-stir-fry',
    diets: ['gluten-free'],
    cuisine: 'Asian',
    ingredients: [
      'chicken breast',
      'broccoli',
      'bell pepper',
      'carrot',
      'soy sauce (gluten-free)',
      'ginger',
      'garlic',
      'sesame oil',
      'cornstarch',
      'green onion',
      'sesame seeds',
      'rice',
    ],
    pricePerServing: 4.0,
    popularity: 78,
  },
  {
    id: 4,
    title: 'Dairy-Free Tacos',
    image: './chicken.webp',
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: 'https://example.com/dairy-free-tacos',
    diets: ['dairy-free'],
    cuisine: 'Mexican',
    ingredients: [
      'corn tortillas',
      'ground beef',
      'taco seasoning',
      'lettuce',
      'tomato',
      'avocado',
    ],
    pricePerServing: 2.8,
    popularity: 88,
  },
  {
    id: 5,
    title: 'Middle Eastern Hummus',
    image: './chicken.webp',
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: 'https://example.com/middle-eastern-hummus',
    diets: ['vegan', 'gluten-free'],
    cuisine: 'Middle Eastern',
    ingredients: ['chickpeas', 'tahini', 'garlic', 'lemon juice', 'olive oil'],
    pricePerServing: 1.5,
    popularity: 95,
  },
  {
    id: 6,
    title: 'Quick Avocado Toast',
    image: './chicken.webp',
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: 'https://example.com/quick-avocado-toast',
    diets: ['vegan'],
    cuisine: 'Mediterranean',
    ingredients: ['bread', 'avocado', 'lemon juice', 'salt'],
    pricePerServing: 2.0,
    popularity: 90,
  },
  {
    id: 7,
    title: 'Beef Stew',
    image: './chicken.webp',
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: 'https://example.com/beef-stew',
    diets: [],
    cuisine: 'European',
    ingredients: [
      'beef chunks',
      'potatoes',
      'carrots',
      'onion',
      'garlic',
      'tomato paste',
      'beef broth',
      'red wine',
      'bay leaves',
      'thyme',
      'salt',
      'black pepper',
      'butter',
      'flour',
      'celery',
      'mushrooms',
    ],
    pricePerServing: 5.5,
    popularity: 80,
  },
];

const FILTERS = [
  {
    category: 'diets',
    items: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free'],
  },
  {
    category: 'cuisine',
    items: [
      'Mediterranean',
      'Middle Eastern',
      'Asian',
      'Italian',
      'Mexican',
      'European',
    ],
  },
  // {
  //   category: 'cooking_time',
  //   items: ['Under 15 min', '15-30 min', '30-60 min', 'Over 60 min'],
  // },
  // {
  //   category: 'Amount_of_ingredients',
  //   items: [
  //     'Under 5 ingredients',
  //     '6-10 ingredients',
  //     '11-15 ingredients',
  //     'Over 15 ingredients',
  //   ],
  // },
];

//Generera filter-knappar
const generateFilterButtons = (aArray) => {
  aArray.forEach((filter) => {
    //Filterknappar utom All-knappen
    const filtersContainerChild = document.createElement('div');
    filtersContainerChild.classList.add(
      'filter-container-child',
      filter.category.toLowerCase().replace(/_/g, '-')
    );

    const title = document.createElement('h2');
    title.textContent = filter.category.replace(/_/g, ' ');
    filtersContainerChild.appendChild(title);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add(
      `button-container`,
      `filter-${filter.category.toLowerCase().replace(/_/g, '-')}`
    );

    // Skapar "All"-knappen
    const allButton = document.createElement('button');
    allButton.classList.add('all');
    allButton.textContent = 'All';
    buttonContainer.appendChild(allButton);

    filter.items.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('filter-btn');
      button.textContent = item;
      buttonContainer.appendChild(button);
    });

    filtersContainerChild.appendChild(buttonContainer);
    filtersContainer.appendChild(filtersContainerChild);
  });
};

// Eventlyssnare på hela filtersContainer
filtersContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const clickedButton = event.target;

    // Om det är "All"-knappen
    if (clickedButton.classList.contains('all')) {
      const filterContainer = clickedButton.parentElement;
      const filterButtons = filterContainer.querySelectorAll('.filter-btn');

      if (!clickedButton.classList.contains('active')) {
        // Lägg till "active" på All-knappen och alla filterknappar
        clickedButton.classList.add('active');
        filterButtons.forEach((btn) => btn.classList.add('active'));
      } else {
        // Ta bort "active" från All-knappen och alla filterknappar
        clickedButton.classList.remove('active');
        filterButtons.forEach((btn) => btn.classList.remove('active'));
      }
    } else {
      // Toggla active-klassen för en enskild filter-knapp
      clickedButton.classList.toggle('active');
    }
    // Efter att klasserna ändrats, anropa filterRecipes för att uppdatera receptlistan
    filterRecipes();
  }
});

//generera recipie-cards dynamiskt
const generateRecipeCards = (ARRAY) => {
  ARRAY.forEach((recipe) => {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    card.innerHTML = `
    <div class="img-container">
      <img src="${recipe.sourceUrl}" alt="Bild på ${recipe.title}">
      </div>
            <h2>${recipe.title}</h2>
            <hr>
            <div class="time-and-cuisine">
            <div class="time">
            <h3>Time:</h3>
            <p>${recipe.readyInMinutes}</p>
            </div>
            <div class="cuisine">
            <h3>Cuisine:</h3>
            <p>${recipe.cuisine}</p>
            </div>
            </div>
                        <hr>

            <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join('')}
            </ul>
            </div>
    `;
    recipesContainer.appendChild(card);
  });
};

const presentSelectedFilters = (selectedFilterArray) => {
  const filterValueContainer = document.getElementById('selected-filters');

  const filteredArray = selectedFilterArray.filter(
    (filter) => filter !== 'all'
  );

  filterValueContainer.textContent = filteredArray.length
    ? `Valda filter: ${filteredArray.join(', ')}`
    : 'Valda filter: Inga';
};

//FILTRERING!!!!! AI har hjälpt mig, behöver lära mig detta, gå ingenom varje steg.
const filterRecipes = () => {
  recipesContainer.innerHTML = '';
  const selectedFilters = Array.from(
    document.querySelectorAll('.filter-btn.active, .all.active')
  ).map((btn) => btn.textContent.toLowerCase());

  presentSelectedFilters(selectedFilters);

  console.log('📌 Valda filter:', selectedFilters);

  let filteredRecipes;
  // Om inga filter är valda → Visa alla recept
  if (selectedFilters.length === 0) {
    filteredRecipes = [...RECIPES];
  } else {
    filteredRecipes = [...RECIPES].filter((recipe) => {
      const isAllSelected = selectedFilters.includes('all');
      if (isAllSelected) {
        return true;
      }

      // Steg 1: Skapa separata listor för diets och cuisine
      const selectedDiets = selectedFilters.filter((filter) =>
        RECIPES.some((recipe) => recipe.diets.includes(filter))
      );

      const selectedCuisines = selectedFilters.filter((filter) =>
        RECIPES.some((recipe) => recipe.cuisine.toLowerCase() === filter)
      );

      //Steg 2: Kolla om receptet matchar filtren
      const matchesDiets =
        selectedDiets.length === 0 ||
        selectedDiets.every((diet) => recipe.diets.includes(diet));

      const matchesCuisine =
        selectedCuisines.length === 0 ||
        selectedCuisines.includes(recipe.cuisine.toLowerCase());

      // Steg 3: Returnera resultatet - receptet måste matcha båda kategorierna
      const result = matchesDiets && matchesCuisine;
      return result;
    });

    if (!filteredRecipes || filteredRecipes.length === 0) {
      recipesContainer.innerHTML = '<p>Inga recept matchar dina filter.</p>';
      return;
    }
  }

  console.log('filteredRecipes:', filteredRecipes);
  visibleRecipes = filteredRecipes;

  // Uppdatera DOM:en med filtrerade recept
  generateRecipeCards(filteredRecipes);

  //Sortering uppdateras vid ny filtrering
  sortVisibleRecipes();
};

const sortVisibleRecipes = () => {
  if (visibleRecipes.length === 0) return; // Om inga kort finns, gör ingenting

  //Hämta sorteringsval från vår selector
  const sortOrder = sortSelect.value;

  let sortedRecipes = [...visibleRecipes];

  //Sortera recepten beroende på användarens val
  if (sortOrder === 'longest') {
    sortedRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
  } else if (sortOrder === 'shortest') {
    sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  }

  //rensa container och generera nya kort på den sorterade listan
  recipesContainer.innerHTML = '';
  generateRecipeCards(sortedRecipes);
};

const getRandomRecipe = () => {
  if (RECIPES.length === 0) {
    recipesContainer.innerHTML =
      '<p>Hoppsan! Vi hittade inget roligt recept idag...</p>';
    return;
  }

  const randomIndex = Math.floor(Math.random() * RECIPES.length);
  const randomRecipe = RECIPES[randomIndex];

  console.log('🎲 Random Recipe Selected:', randomRecipe); // Debugging

  // Clear the container and display only the random recipe
  recipesContainer.innerHTML = '';
  generateRecipeCards([randomRecipe]);
};

const initApp = () => {
  //generera filterknappar
  generateFilterButtons(FILTERS);

  //Visar alla recept vid start
  filterRecipes();

  //Sorteringsknapp
  sortSelect.addEventListener('change', sortVisibleRecipes);

  //SupriseMeKnapp
  surpriseButton.addEventListener('click', getRandomRecipe);
};

//Initiera hela appen när sidan laddas
document.addEventListener('DOMContentLoaded', initApp);

//Fetch fron ComplexSearch to get recipies with specific Cuisines
const fetchRecipes = async () => {
  try {
    const url = `${searchEndPoint}?apiKey=${API_KEY}&number=10&cuisine=${includedCuisines}`;
    console.log('Fetching recipes from:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error('No recipes found for the given cuisines.');
    }

    console.log('Result from complexSearch:', data.results);

    const recipeIds = data.results.map((recipe) => recipe.id).join(',');
    console.log('recipe ids', recipeIds);
    return fetchRecipeDetails(recipeIds);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    return [];
  }
};

//Need to fetch again to get ingridiets... with bulk, dont find any other way....
const fetchRecipeDetails = async (recipeIds) => {
  try {
    const url = `${bulkEndPoint}?apiKey=${API_KEY}&ids=${recipeIds}`;
    console.log('Fetching detailed recipe data from:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Detailed Recipes:', data);
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    return [];
  }
};

fetchRecipes();
