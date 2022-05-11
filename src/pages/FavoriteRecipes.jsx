import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

/* cy.get('[data-testid="0-horizontal-image"]');
cy.get('[data-testid="0-horizontal-top-text"]');
cy.get('[data-testid="0-horizontal-name"]');
cy.get('[data-testid="0-horizontal-share-btn"]');
cy.get('[data-testid="0-horizontal-favorite-btn"]'); */

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteCards = favoriteRecipes.map((element, index) => (
    <div key={ index }>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ element.image }
        alt={ element.name }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {element.category}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        {element.name}
      </p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        /* onClick={ copyText } */
      >
        <img src={ shareIcon } alt="share button" />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
      >
        <img src={ whiteHeartIcon } alt="favorite button" />
      </button>
    </div>
  ));

  return (
    <>
      <Header title="Favorite Recipes" />
      <div>Favorite Recipes</div>
      <button
        className="btn-explore-food"
        data-testid="filter-by-all-btn"
        type="button"
        /* onClick={ () => history.push('/explore/foods') } */
      >
        All
      </button>

      <button
        className="btn-explore-food"
        data-testid="filter-by-food-btn"
        type="button"
        /* onClick={ () => history.push('/explore/foods') } */
      >
        Food
      </button>

      <button
        className="btn-explore-food"
        data-testid="filter-by-drink-btn"
        type="button"
        /* onClick={ () => history.push('/explore/foods') } */
      >
        Drink
      </button>
      {favoriteCards}
    </>
  );
}

export default FavoriteRecipes;
