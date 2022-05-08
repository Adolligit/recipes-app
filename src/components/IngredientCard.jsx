import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeCard.css';
import { fetchAPI } from '../helpers/fetchAPI';

const MAGIC_NUMBER = 12;

function IngredientCard({ history }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const { location: { pathname } } = history;
    const recipeType = (pathname.split('/')[2] === 'foods') ? 'Meal' : 'Cocktail';

    fetchAPI(`fetch${recipeType}IngredientsByList`, '')
      .then((arr) => setIngredients(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ingredients.map(({ strIngredient, strIngredient1 }, i) => (
    <div
      key={ strIngredient || strIngredient1 }
      data-testid={ `${i}-ingredient-card` }
    >
      
    </div>
  ));
}

IngredientCard.propTypes = { history: PropTypes.objectOf() }.isRequired;

export default IngredientCard;
