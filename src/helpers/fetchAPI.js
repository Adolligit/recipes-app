const fetchByCategories = async (mealOrDrink, category) => {
  try {
    const response = await fetch(`https://www.the${mealOrDrink}db.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    const changeCocktailToDrink = mealOrDrink === 'cocktail' ? 'drinks' : 'meals';
    return data[changeCocktailToDrink];
  } catch (error) {
    console.error(error);
  }
};

const fetchAPI = async (chooseUrl, query) => {
  const verifyUrl = {
    // ID
    fetchMealById: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`,
    fetchCocktailById: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${query}`,

    // Nome
    fetchMealByName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    fetchCocktailByName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,

    // Ingrediente
    fetchMealByIngredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
    fetchCocktailByIngredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,

    // Categoria
    fetchMealListCategory: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    fetchCocktailListCategory: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',

    // Primeira letra
    fetchMealByFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
    fetchCocktailByFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`,

    // Lista de ingredientes
    fetchMealIngredientsByList: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    fetchCocktailIngredientsByList: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',

    // Surprise me - receita aleatória
    fetchMealSurpriseMe: 'https://www.themealdb.com/api/json/v1/1/random.php',
    fetchCocktailSurpriseMe: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',

    // Recomendações
    fetchMealRecomendation: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    fetchCocktailRecomendation: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  };

  if (query.length !== 1
    && (chooseUrl === 'fetchMealByFirstLetter'
    || chooseUrl === 'fetchCocktailByFirstLetter')) {
    global.alert('Your search must have only 1 (one) character');
  }
  try {
    const response = await fetch(verifyUrl[chooseUrl]);
    const data = await response.json();
    // tratando null para evitar de quebrar verificacao com length
    if (!Object.values(data)[0]) return [];
    // Retornar somente primeira chave sendo `meals` ou `drinks`
    return Object.values(data)[0];
  } catch (error) {
    console.error(error);
  }
};

async function getIngredientImage(url, img) {
  const response = await fetch(`https://the${url}db.com/images/ingredients/${img}.png`);
  const json = await response.json();
  return Object.values(json)[0];
}

export { fetchAPI, fetchByCategories, getIngredientImage };
