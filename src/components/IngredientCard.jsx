import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeCard.css';
import { fetchAPI } from '../helpers/fetchAPI';

const MAGIC_NUMBER = 12;

function IngredientCard({ history }) {
  const [ingredients, setIngredients] = useState([]);

  const { location: { pathname } } = history;
  const recipeType = (pathname.split('/')[2] === 'foods') ? 'Meal' : 'Cocktail';

  useEffect(() => {
    fetchAPI(`fetch${recipeType}IngredientsByList`, '')
      .then((arr) => setIngredients(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ingredients.map(({ strIngredient, strIngredient1 }, i) => {
    const ingredient = strIngredient || strIngredient1;
    return (
      <div
        key={ ingredient }
        data-testid={ `${i}-ingredient-card` }
      >
        <img
          src={ `https://www.the${recipeType.toLowerCase()}db.com/images/ingredients/${ingredient}-Small.png` }
          alt={ ingredient }
          data-testid={ `${i}-card-img` }
        />
        <h3 data-testid={ `${i}-card-name` }>{ ingredient }</h3>
      </div>
    );
  }).slice(0, MAGIC_NUMBER);
}

IngredientCard.propTypes = { history: PropTypes.objectOf() }.isRequired;

export default IngredientCard;
