import React, { useEffect, useState } from 'react';
import Slide from '../components/Details/Slide';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { fetchAPI } from '../helpers/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import StartContinueButton from '../components/Details/StartContinueButton';

// eslint-disable-next-line sonarjs/cognitive-complexity
function Details({ history }) {
  const [recipeDetails, setRecipeDetails] = useState([{}]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [recipeRecomendation, setRecipeRecomendation] = useState([]);

  const { location: { pathname } } = history;
  const url = pathname.split('/').slice(1);
  const recipeType = (url[0] === 'foods') ? 'Meal' : 'Cocktail';
  const recipeTypeRecomendations = (url[0] === 'foods') ? 'Cocktail' : 'Meal';

  function copyText() {
    setCopiedLink(true);
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  }

  useEffect(() => {
    fetchAPI(`fetch${recipeType}ById`, url[1]).then((arr) => setRecipeDetails(arr));

    fetchAPI(`fetch${recipeTypeRecomendations}Recomendation`, '')
      .then((arr) => setRecipeRecomendation(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeTypeRecomendations]);

  const filterIngredients = Object
    .entries(recipeDetails[0])
    .filter((key) => key[0].includes('strIngredient') && key[1])
    .map((e) => e[1]);

  const filterMeasures = Object
    .entries(recipeDetails[0])
    .filter((key) => key[0].includes('strMeasure') && key[1])
    .map((e) => e[1]);

  return recipeDetails.map((recipe) => (
    <div key="recipe">
      <img
        data-testid="recipe-photo"
        alt={ recipe.strMeal || recipe.strDrink }
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
      />
      <h1 data-testid="recipe-title">
        {recipe.strMeal || recipe.strDrink}
      </h1>

      <h3
        data-testid="recipe-category"
      >
        {recipe.strAlcoholic}
      </h3>

      { !copiedLink ? (
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyText }
        >
          <img src={ shareIcon } alt="share button" />
        </button>
      ) : <p>Link copied!</p>}

      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="favorite button" />
      </button>
      <h3 data-testid="recipe-category">
        {recipe.strCategory}
      </h3>
      <ol>
        {
          filterIngredients.map((ingredient, index) => (
            <li
              key={ `${index}${ingredient}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${filterMeasures[index]}`}
            </li>
          ))
        }
      </ol>
      <span data-testid="instructions">
        {recipe.strInstructions}
      </span>
      {
        (recipe.strYoutube)
        && (<iframe
          width="360"
          height="240"
          data-testid="video"
          title={ recipe.strMeal || recipe.strDrink }
          src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
        />)
      }
      { /* desculpa a gambiarra */ }
      <Slide recipeRecomendation={ recipeRecomendation } url={ url[0] } />
      <StartContinueButton
        recipeDetails={ recipeDetails }
        history={ history }
        recipeType={ recipeType }
        url={ url[1] }
      />
    </div>
  ));
}

Details.propTypes = {}.isRequired;

export default Details;
