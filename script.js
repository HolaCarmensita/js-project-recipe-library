const recipesContainer = document.querySelector('.recipes-container');
const filtersContainer = document.querySelector('.filters-container');
const sortSelect = document.getElementById('sort-select');
const supriseButton = document.getElementById('random-recipe-btn');

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
  {
    category: 'cooking_time',
    items: ['Under 15 min', '15-30 min', '30-60 min', 'Over 60 min'],
  },
  {
    category: 'Amount_of_ingredients',
    items: [
      'Under 5 ingredients',
      '6-10 ingredients',
      '11-15 ingredients',
      'Over 15 ingredients',
    ],
  },
];

//Generera filter-knappar
const generateFilterButtons = (aArray) => {
  aArray.forEach((filter) => {
    const card = document.createElement('div');
    card.classList.add(
      'filter-card',
      filter.category.toLowerCase().replace(/_/g, '-')
    );

    const title = document.createElement('h2');
    title.textContent = filter.category.replace(/_/g, ' ');
    card.appendChild(title);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add(
      `filter-${filter.category.toLowerCase().replace(/_/g, '-')}`
    );

    //Skapar all knappen med klassen all
    const allButton = document.createElement('button');
    allButton.classList.add('all');
    allButton.textContent = 'All';
    buttonContainer.appendChild(allButton);

    buttonContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const buttons = buttonContainer.querySelectorAll('.filter-btn, .all');
        const allButton = buttonContainer.querySelector('.all'); // Hämta "All"-knappen
        const filterButtons = buttonContainer.querySelectorAll('.filter-btn'); // Hämta alla filterknappar

        if (event.target.classList.contains('all')) {
          const isActive = event.target.classList.contains('active');

          buttons.forEach((btn) => {
            if (isActive) {
              btn.classList.add('active'); // Om "All" redan är aktiv → Avmarkera allt
            } else {
              btn.classList.remove('active'); // Om "All" inte är aktiv → Markera alla
            }
          });
        } else {
          event.target.classList.toggle('active'); // Toggla enskilda knappar

          //Om alla filterknappar är aktiva → aktivera "All"
          // const allSelected = [...filterButtons].every((btn) =>
          //   btn.classList.contains('active')
          // );

          // if (allSelected) {
          //   allButton.classList.remove('active');
          // } else {
          //   allButton.classList.add('active');
          // }
        }

        filterRecipes(); // Uppdatera filtreringen
      }
    });

    filter.items.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('filter-btn');
      button.textContent = item;
      buttonContainer.appendChild(button);
    });

    card.appendChild(buttonContainer);
    filtersContainer.appendChild(card);
  });
};

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
  const selectedFilters = document.querySelectorAll(
    '.filter-btn.active, .all.active'
  );
  const SELECTED_FILTERS = Array.from(selectedFilters).map((btn) =>
    btn.textContent.toLowerCase()
  );

  presentSelectedFilters(SELECTED_FILTERS);

  console.log('📌 Valda filter:', SELECTED_FILTERS);

  let filteredRecipes;

  // Om inga filter är valda → Visa alla recept
  if (SELECTED_FILTERS.length === 0) {
    console.log('✅ Inga filter valda, visar alla recept!');
    filteredRecipes = [...RECIPES];
  } else {
    console.log('🔍 Börjar filtrera recept...');

    filteredRecipes = [...RECIPES].filter((recipe) => {
      console.log('🔎 Kollar recept:', recipe.title);
      console.log('👀 Diets i receptet:', recipe.diets);
      console.log('👀 Cuisine i receptet:', recipe.cuisine.toLowerCase());

      const isAllSelected = SELECTED_FILTERS.includes('all');
      if (isAllSelected) {
        console.log("✅ 'All' är vald, visar alla recept");
        return true;
      }

      // 🔥 Steg 1: Skapa separata listor för diets och cuisine
      const selectedDiets = SELECTED_FILTERS.filter((filter) =>
        RECIPES.some((recipe) => recipe.diets.includes(filter))
      );

      const selectedCuisines = SELECTED_FILTERS.filter((filter) =>
        RECIPES.some((recipe) => recipe.cuisine.toLowerCase() === filter)
      );

      console.log('📌 Valda Diets:', selectedDiets);
      console.log('📌 Valda Cuisines:', selectedCuisines);

      // 🔥 Steg 2: Kolla om receptet matchar filtren
      const matchesDiets =
        selectedDiets.length === 0 ||
        selectedDiets.every((diet) => recipe.diets.includes(diet));

      const matchesCuisine =
        selectedCuisines.length === 0 ||
        selectedCuisines.includes(recipe.cuisine.toLowerCase());

      console.log('✔ Matchar Diets?', matchesDiets);
      console.log('✔ Matchar Cuisine?', matchesCuisine);

      // 🔥 Steg 3: Returnera resultatet - receptet måste matcha båda kategorierna
      const result = matchesDiets && matchesCuisine;

      console.log('🔥 Returnerar', result);
      return result;
    });

    console.log('📌 Efter filtrering, filteredRecipes:', filteredRecipes);

    if (!filteredRecipes || filteredRecipes.length === 0) {
      console.log('❌ Inga recept matchar filtren!');
      recipesContainer.innerHTML = '<p>Inga recept matchar dina filter.</p>';
      return;
    }
  }

  // Uppdatera DOM:en med filtrerade recept
  generateRecipeCards(filteredRecipes);

  //Sortering uppdateras vid ny filtrering
  sortVisibleRecipes();
};

const sortVisibleRecipes = () => {
  const recipeCards = Array.from(document.querySelectorAll('.recipe-card'));

  if (recipeCards.length === 0) return; // Om inga kort finns, gör ingenting

  // 🔹 1. Hämta alla titlar från synliga receptkort
  const visibleTitles = recipeCards.map((card) =>
    card.querySelector('h2').textContent.trim()
  );

  // 🔹 2. Filtrera ut rätt recept från RECIPES baserat på titlarna
  let filteredRecipes = RECIPES.filter((recipe) =>
    visibleTitles.includes(recipe.title)
  );

  // 🔹 3. Hämta sorteringsval
  const sortOrder = sortSelect.value;

  // 🔹 4. Sortera recepten beroende på användarens val
  if (sortOrder === 'longest') {
    filteredRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
  } else if (sortOrder === 'shortest') {
    filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  }

  // 🔹 5. Generera kort med den sorterade listan
  recipesContainer.innerHTML = '';
  generateRecipeCards(filteredRecipes);
};

// 🔹 6. Lägg till eventListener på sorteringsdropdown

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

const initEventListeners = () => {
  sortSelect.addEventListener('change', sortVisibleRecipes);

  supriseButton.addEventListener('click', getRandomRecipe);
};

const initApp = () => {
  //generera filterknappar
  generateFilterButtons(FILTERS);

  //Visar alla recept vid start
  filterRecipes();

  //Sorteringsknapp
  sortSelect.addEventListener('change', sortVisibleRecipes);

  //SupriseMeKnapp
  supriseButton.addEventListener('click', getRandomRecipe);
};

//Initiera hela appen när sidan laddas
document.addEventListener('DOMContentLoaded', initApp);

// generateRecipeCards(RECIPES);

// Filtrera på Cooking Time
// const matchesCookingTime = SELECTED_FILTERS.some((time) => {
//   if (time === 'under 15 min') return recipe.readyInMinutes < 15;
//   if (time === '15-30 min')
//     return recipe.readyInMinutes >= 15 && recipe.readyInMinutes <= 30;
//   if (time === '30-60 min')
//     return recipe.readyInMinutes > 30 && recipe.readyInMinutes <= 60;
//   if (time === 'over 60 min') return recipe.readyInMinutes > 60;
//   return false;
// });

// Filtrera på antalet ingredienser
// const matchesIngredients = SELECTED_FILTERS.some((amount) => {
//   const numIngredients = recipe.ingredients.length;
//   if (amount === 'under 5 ingredients') return numIngredients < 5;
//   if (amount === '6-10 ingredients')
//     return numIngredients >= 6 && numIngredients <= 10;
//   if (amount === '11-15 ingredients')
//     return numIngredients >= 11 && numIngredients <= 15;
//   if (amount === 'over 15 ingredients') return numIngredients > 15;
//   return false;
// });
