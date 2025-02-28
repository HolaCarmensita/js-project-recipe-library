const recipesContainer = document.querySelector('.recipes-container');
const filtersContainer = document.querySelector('.filters-container');

const recipes = [
  {
    title: 'Pasta Carbonara',
    cuisine: 'Italian',
    time: '20 min',
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan', 'Black pepper'],
    image: 'assets/img/bread.jpeg',
  },
  {
    title: 'Sushi',
    cuisine: 'Japanese',
    time: '45 min',
    ingredients: ['Rice', 'Nori', 'Salmon', 'Avocado', 'Soy sauce'],
    image: 'assets/img/pommes.jpeg',
  },
];

const filters = [
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
];

//generera recipie-cards dynamiskt
function generateRecipeCards() {
  console.log('generateRecipesCards is executing');
  recipes.forEach((recipe) => {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    card.innerHTML = `
    <div class="img-container">
      <img src="${recipe.image}" alt="Bild på ${recipe.title}">
      </div>
            <h2>${recipe.title}</h2>
            <hr>
            <div class="time-and-cuisine">
            <div class="time">
            <h3>Time:</h3>
            <p>${recipe.time}</p>
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
}

//Generera filter-knappar
function generateFilterCards() {
  console.log('genereateFilterCArds is executing');

  //Skapa filter-card som parent
  filters.forEach((filter) => {
    const card = document.createElement('div');
    card.classList.add('filter-card');

    // Skapa titel (h2) för kategorin
    const title = document.createElement('h2');
    title.textContent = filter.category.replace('_', ' ');
    //Lägger in titeln i filter-card
    card.appendChild(title);

    //Steg 1 Skapar en ButtonContainer för knapparna med en klass baserad på kategorin!
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add(`filter-${filter.category}`);

    //Steg 2 Här vill vi ha en all-knapp i vår buttonContainer
    const allButton = document.createElement('button');
    allButton.classList.add('all');
    allButton.textContent = 'All';
    buttonContainer.appendChild(allButton);

    //Steg 3 Skapar en knapp från vaerje item i item-listan
    filter.items.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('filter-btn');
      button.textContent = item;
      buttonContainer.appendChild(button);
    });

    //Steg 4 Lägg in buttonContainer i filter Card.
    card.appendChild(buttonContainer);

    //Läg in det nu kompletta kortet i den redan existerade filterContainer
    filtersContainer.appendChild(card);
  });
}

generateFilterCards();
generateRecipeCards();
