import React, { useState } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  function copyText() {
    setCopiedLink(true);

    const copiedText = favoriteRecipes.map((element) => (
      navigator.clipboard.writeText(`http://localhost:3000/${element.type}s/${element.id}`)
    ));
    return copiedText;
  }

  function removeFromFavorite(idRemove) {
    const newFavorites = favoriteRecipes.filter(({ id }) => id !== idRemove);

    localStorage.favoriteRecipes = JSON.stringify(newFavorites);
    setUpdatePage(!updatePage);
  }

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
        {element.type === 'food' ? (
          `${element.nationality} - ${element.category}`
        ) : element.alcoholicOrNot}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        {element.name}
      </p>

      { !copiedLink ? (
        <button
          type="button"
          onClick={ copyText }
        >
          <img
            src={ shareIcon }
            alt="share button"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
      ) : <p>Link copied!</p>}
      <button
        type="button"
        onClick={ () => removeFromFavorite(element.id) }
      >
        <img
          src={ blackHeartIcon }
          alt="favorite button"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  ));

  return (
    <>
      <Header title="Favorite Recipes" />
      <div>Favorite Recipes</div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drink
      </button>
      {favoriteCards}
    </>
  );
}

FavoriteRecipes.propTypes = {}.isRequired;

export default FavoriteRecipes;
