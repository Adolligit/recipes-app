import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../css/RecipeCard.css';
import { fetchAPI } from '../helpers/fetchAPI';

const MAGIC_NUMBER = 12;

function IngredientCard({ history }) {
  const { setFunctions: { setDataRecipes } } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);

  const { location: { pathname } } = history;
  const recipeType = (pathname.split('/')[2] === 'foods') ? 'Meal' : 'Cocktail';

  useEffect(() => {
    fetchAPI(`fetch${recipeType}IngredientsByList`, '')
      .then((arr) => setIngredients(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clickCard(ingredient) {
    fetchAPI(`fetch${recipeType}ByIngredient`, ingredient)
      .then((e) => {
        setDataRecipes(e);
        history.push(`/${pathname.split('/')[2]}`);
      });
  }

  return ingredients.map(({ strIngredient, strIngredient1 }, i) => {
    const ingredient = strIngredient || strIngredient1;
    return (
      <button
        type="button"
        key={ ingredient }
        data-testid={ `${i}-ingredient-card` }
        onClick={ () => clickCard(ingredient) }
      >
        <img
          src={ `https://www.the${recipeType.toLowerCase()}db.com/images/ingredients/${ingredient}-Small.png` }
          alt={ ingredient }
          data-testid={ `${i}-card-img` }
        />
        <h3 data-testid={ `${i}-card-name` }>{ ingredient }</h3>
      </button>
    );
  }).slice(0, MAGIC_NUMBER);
}

IngredientCard.propTypes = { history: PropTypes.objectOf() }.isRequired;

export default IngredientCard;
