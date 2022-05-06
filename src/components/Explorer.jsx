import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAPI } from '../helpers/fetchAPI';

function Explorer(props) {
  const { linkTo, history } = props;
  const [recipeSurprise, setRecipeSurprise] = useState({});
  const isFood = linkTo === 'foods';

  const btnNationality = (
    <button
      className="btn-explore-food"
      data-testid="explore-by-nationality"
      type="button"
      onClick={ () => history.push('/explore/foods/nationalities') }
    >
      <div className="title-btn-explore">
        By Nationality
      </div>
      {/* <img
        src={ ExploreDrinks }
        alt="imagem comida"
      /> */}
    </button>
  );

  function goToSurpriseMe() {
    let linkSurprise = '';
    if (linkTo === 'foods') {
      linkSurprise = `/${linkTo}/${recipeSurprise.idMeal}`;
      if (linkSurprise !== '/foods/undefined') {
        history.push(linkSurprise);
      }
    } else {
      linkSurprise = `/${linkTo}/${recipeSurprise.idDrink}`;
      if (linkSurprise !== '/drinks/undefined') {
        history.push(linkSurprise);
      }
    }
  }

  async function getSurpriseMe() {
    if (recipeSurprise.length > 0) {
      recipeSurprise.splice(0, recipeSurprise.length);
    }
    if (linkTo === 'foods') {
      fetchAPI('fetchMealSurpriseMe', '').then((data) => setRecipeSurprise(...data));
    } else {
      fetchAPI('fetchCocktailSurpriseMe', '')
        .then((data) => setRecipeSurprise(...data));
    }
  }

  useEffect(() => {
    goToSurpriseMe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeSurprise]);

  return (
    <div className="box-explore">
      <button
        className="btn-explore-food"
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push(`/explore/${linkTo}/ingredients`) }
      >
        <div className="title-btn-explore">
          By Ingredient
        </div>
        {/* <img
          src={ ExploreFoods }
          alt="imagem comida"
        /> */}
      </button>
      { isFood && btnNationality }
      <button
        className="btn-explore-food"
        data-testid="explore-surprise"
        type="button"
        onClick={ getSurpriseMe }
      >
        <div className="title-btn-explore">
          Surprise me!
        </div>
        {/* <img
          src={ ExploreDrinks }
          alt="imagem comida"
        /> */}
      </button>
    </div>
  );
}

Explorer.propTypes = {
  history: PropTypes.objectOf(),
}.isRequerid;

export default Explorer;
