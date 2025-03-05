const recipesContainer = document.querySelector('.recipes-container');
const filtersContainer = document.querySelector('.filters-container');

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
    items: ['Mediterranean', 'Middle Eastern', 'Asian', 'Italian', 'Mexican'],
  },
  {
    category: 'cooking_time',
    items: ['Under 15 min', '15-30 min', '30-60 min', 'Over 60 min'],
  },
  ,
  {
    category: 'Amount_of_ingredients',
    items: [
      'Under 5 ingredients',
      '6-10 ingredients',
      '11-15 ingredients',
      'Over 16 ingredients',
    ],
  },
];

//Generera filter-knappar
const generateFilterButtons = () => {
  //Skapa filter-card som parent
  FILTERS.forEach((filter) => {
    const card = document.createElement('div');
    card.classList.add(
      'filter-card',
      filter.category.toLowerCase().replace(/_/g, '-')
    );

    // Skapa titel (h2) för kategorin
    const title = document.createElement('h2');
    title.textContent = filter.category.replace(/_/g, ' ');
    //Lägger in titeln i filter-card
    card.appendChild(title);

    //Steg 1 Skapar en ButtonContainer för knapparna med en klass baserad på kategorin!
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add(
      `filter-${filter.category.toLowerCase().replace(/_/g, '-')}`
    );

    //Steg 2 Här vill vi ha en all-knapp i vår buttonContainer
    const allButton = document.createElement('button');
    allButton.classList.add('all');
    allButton.textContent = 'All';
    buttonContainer.appendChild(allButton);

    //Steg 2,5 Eventlistner på buttonContainer, all-knappen och enskilda knappar.
    buttonContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('all')) {
          // Om "All"-knappen klickas, toggla alla knappar i buttonContainer
          const buttons = buttonContainer.querySelectorAll('.filter-btn, .all');
          const isActive = event.target.classList.contains('active'); // Är "All" aktiv?

          buttons.forEach((btn) => {
            if (isActive) {
              btn.classList.remove('active'); // Ta bort "active" om "All" redan är aktiv
            } else {
              btn.classList.add('active'); // Lägg till "active" annars
            }
          });
        } else {
          // Om en vanlig knapp klickas, toggla bara den
          event.target.classList.toggle('active');
        }
        updateSelectedFiltersPTag();
      }
    });

    //Steg 3 Skapar en knapp från vaerje item i item-listan
    filter.items.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('filter-btn');
      button.textContent = item;

      //EventListner on click
      buttonContainer.appendChild(button);
    });

    //Steg 4 Lägg in buttonContainer i filter Card.
    card.appendChild(buttonContainer);
    //Läg in det nu kompletta kortet i den redan existerade filterContainer
    filtersContainer.appendChild(card);
  });
};

//generera recipie-cards dynamiskt
const generateRecipeCards = () => {
  recipesContainer.innerHTML = ''; //resets the container before we load

  RECIPES.forEach((recipe) => {
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

const filterRecipes = () => {
  /*Här ska vi filtrera som vi gjort i FilterPtag*/
};

//Funktion för att uppdatera p-taggen, valda filter (gjord av AI behöver gå igenom hur denna fungerar )
const updateSelectedFiltersPTag = () => {
  const selectedFilters = document.querySelectorAll('.filter-btn.active');

  const allSelected = Array.from(selectedFilters).map((btn) => btn.textContent);

  const displayElement = document.getElementById('selected-filters');
  displayElement.textContent = allSelected.length
    ? `Valda filter: ${allSelected.join(', ')}`
    : 'Valda filter: Inga';
};

generateFilterButtons();
generateRecipeCards();
