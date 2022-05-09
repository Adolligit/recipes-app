import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { fetchAPI } from '../helpers/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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

  const magic6 = 6;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  function existRecipe() {
    if (localStorage.doneRecipes) {
      return JSON.parse(localStorage.doneRecipes)
        .find(({ id }) => (
          id === (recipeDetails[0].idMeal || recipeDetails[0].idDrink)
        ));
    }
    return null;
  }

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
      {
        <div>
          <div>Recomendações</div>
          <div className="constainerSlide">
            <Slider { ...settings }>
              {
                url[0] === 'foods'
            && recipeRecomendation.map((recomendation, index) => (
              index < magic6 && (
                <div
                  className="recomendation-card"
                  key={ `teste${recomendation.strDrink}` }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Link to={ `/drinks/${recomendation.idDrink}` }>
                    <div>
                      <div className="imagemAjuste">
                        <img
                          alt={ recomendation.strDrink }
                          src={ recomendation.strDrinkThumb }
                        />
                      </div>

                      <p
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { recomendation.strDrink }
                      </p>
                    </div>
                  </Link>
                </div>
              )))
              }
              {
                url[0] === 'drinks'
              && recipeRecomendation.map((recomendation, index) => (
                index < magic6 && (
                  <div
                    className="recomendation-card"
                    key={ `teste${recomendation.strMeal}` }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <Link to={ `/foods/${recomendation.idMeal}` }>
                      <div>
                        <div className="imagemAjuste">
                          <img
                            alt={ recomendation.strMeal }
                            src={ recomendation.strMealThumb }
                          />
                        </div>
                        <p
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { recomendation.strMeal }
                        </p>
                      </div>
                    </Link>
                  </div>
                )))
              }
            </Slider>
          </div>
        </div>
      }
      {
        !existRecipe() && (
          <Link to={ `${pathname}/in-progress` }>
            <button
              className="start-recipe-btn"
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </Link>
        )
      }
    </div>
  ));
}

/* teste */

Details.propTypes = { history: PropTypes.objectOf() }.isRequired;

export default Details;
