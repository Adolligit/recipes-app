import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const magic6 = 6;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
};

function Slide({ recipeRecomendation, url }) {
  return (
    <div>
      <div>Recomendações</div>
      <div className="constainerSlide">
        <Slider { ...settings }>
          {
            url === 'foods'
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
            url === 'drinks'
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
  );
}

Slide.propTypes = {}.isRequired;

export default Slide;
