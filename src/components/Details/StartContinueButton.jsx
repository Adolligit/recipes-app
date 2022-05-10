import React from 'react';
import { Link } from 'react-router-dom';

function StartContinueButton({ recipeDetails, history, recipeType, url }) {
  const { location: { pathname } } = history;

  function existRecipe() {
    if (localStorage.doneRecipes) {
      return JSON.parse(localStorage.doneRecipes)
        .find(({ id }) => (
          id === (recipeDetails[0].idMeal || recipeDetails[0].idDrink)
        ));
    }
    return null;
  }

  function nameButton() {
    const keyProgressRecipes = `${recipeType.toLocaleLowerCase()}s`;

    if (localStorage.inProgressRecipes) {
      return Object.keys(JSON.parse(localStorage.inProgressRecipes)[keyProgressRecipes])
        .find((key) => key === url)
        ? 'Continue Recipe'
        : 'Start Recipe';
    }

    return null;
  }

  return (
    !existRecipe() && (
      <Link to={ `${pathname}/in-progress` }>
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          { nameButton() }
        </button>
      </Link>
    )
  );
}

StartContinueButton.propTypes = {}.isRequired;

export default StartContinueButton;
