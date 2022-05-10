import React, { useEffect, useState } from 'react';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FavoriteRecipes({ recipeDetails, url }) {
  const [hearthRecipe, setHearthRecipe] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
    || [];
    const teste = favoriteRecipes.find(({ id }) => id === url);
    console.log(teste ? 1 : 0);
    setHearthRecipe(teste ? 1 : 0);
  }, [url]);

  const favoriteMeal = {
    id: recipeDetails[0].idMeal,
    type: 'food',
    nationality: recipeDetails[0].strArea,
    category: recipeDetails[0].strCategory,
    alcoholicOrNot: '',
    name: recipeDetails[0].strMeal,
    image: recipeDetails[0].strMealThumb,
  };

  const favoriteDrink = {
    id: recipeDetails[0].idDrink,
    type: 'drink',
    nationality: '',
    category: recipeDetails[0].strCategory,
    alcoholicOrNot: recipeDetails[0].strAlcoholic,
    name: recipeDetails[0].strDrink,
    image: recipeDetails[0].strDrinkThumb,
  };

  function favRecipe() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!hearthRecipe) {
      setHearthRecipe(true);
      if (Object.keys(recipeDetails[0]).includes('idMeal')) {
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...favoriteRecipes, favoriteMeal]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...favoriteRecipes, favoriteDrink]));
      }
    } else {
      setHearthRecipe(false);
      const itemsNotRemoved = favoriteRecipes
        .filter((element) => element.id
        !== (favoriteMeal.id || favoriteDrink.id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemsNotRemoved));
    }
  }

  return (
    !hearthRecipe ? (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favRecipe }
        src={ whiteHeartIcon }
        alt="favorite button"
      >
        <img src={ whiteHeartIcon } alt="favorite button" className="favoriteWhite" />
      </button>
    )
      : (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favRecipe }
          src={ blackHeartIcon }
          alt="favorite button"
        >
          <img src={ blackHeartIcon } alt="favorite button" className="favoriteBlack" />
        </button>
      )
  );
}

FavoriteRecipes.propTypes = {}.isRequired;

export default FavoriteRecipes;
