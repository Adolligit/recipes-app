import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setFavoriteCards(favoriteRecipes), [updatePage]);

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

  function filterRecipes({ target: { value } }) {
    const filteredCards = favoriteRecipes.filter(({ type }) => (
      type === value.toLowerCase()
    ));
    setFavoriteCards(filteredCards);
  }

  return (
    <>
      <Header title="Favorite Recipes" />
      <div>Favorite Recipes</div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        value="all"
        onClick={ () => setFavoriteCards(favoriteRecipes) }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterRecipes }
        value="food"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterRecipes }
        value="drink"
      >
        Drink
      </button>
      {
        favoriteCards.map((element, index) => (
          <div key={ index }>
            <Link to={ `/${element.type}s/${element.id}` }>
              <img
                className="img-recipe"
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
              <p data-testid={ `${index}-horizontal-name` }>
                {element.name}
              </p>
            </Link>
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
        ))
      }
    </>
  );
}

FavoriteRecipes.propTypes = {}.isRequired;

export default FavoriteRecipes;
