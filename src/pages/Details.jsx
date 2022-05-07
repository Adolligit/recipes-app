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

  const [mealRecomendation, setMealRecomendation] = useState([]);
  const [cocktailRecomendation, setCocktailRecomendation] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const { location: { pathname } } = history;
  const url = pathname.split('/').slice(1);
  const recipeType = (url[0] === 'foods') ? 'Meal' : 'Cocktail';

  function copyText() {
    setCopiedLink(true);
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  }

  useEffect(() => {
    fetchAPI(`fetch${recipeType}ById`, url[1]).then((arr) => setRecipeDetails(arr));

    fetchAPI('fetchMealRecomendation', url[1])
      .then((arr) => setMealRecomendation(arr));

    fetchAPI('fetchCocktailRecomendation', url[1])
      .then((arr) => setCocktailRecomendation(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            && cocktailRecomendation.map((drinksRecomendation, index) => (
              index < magic6 && (
                <div
                  className="recomendation-card"
                  key={ `teste${drinksRecomendation.strMeal}` }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Link to={ `/drinks/${drinksRecomendation.idDrink}` }>
                    <div>
                      <div className="imagemAjuste">
                        <img
                          alt={ drinksRecomendation.strDrink }
                          src={ drinksRecomendation.strDrinkThumb }
                        />
                      </div>

                      <p
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { drinksRecomendation.strDrink }
                      </p>
                    </div>
                  </Link>
                </div>
              )))
              }
              {
                url[0] === 'drinks'
              && mealRecomendation.map((foodsRecomendation, index) => (
                index < magic6 && (
                  <div
                    className="recomendation-card"
                    key={ `teste${foodsRecomendation.strMeal}` }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <Link to={ `/foods/${foodsRecomendation.idFoods}` }>
                      <div>
                        <div className="imagemAjuste">
                          <img
                            alt={ foodsRecomendation.strMeal }
                            src={ foodsRecomendation.strMealThumb }
                          />
                        </div>
                        <p
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { foodsRecomendation.strMeal }
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
      <Link to={ `${pathname}/in-progress` }>
        <button className="start-recipe-btn" type="button" data-testid="start-recipe-btn">
          Start Recipe
        </button>
      </Link>
    </div>
  ));
}

Details.propTypes = { history: PropTypes.objectOf() }.isRequired;

export default Details;
