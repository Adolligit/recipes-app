import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../css/Header.css';

const Header = (props) => {
  const { title } = props;
  let isRend = true;
  const pagesTitle = [
    'Explore',
    'Explore Foods',
    'Explore Drinks',
    'Explore Ingredients',
    'Ingredients',
    'Done Recipes',
    'Favorite Recipes',
    'Profile',
  ];

  const { returnSelectedOption,
    search, setSearch, onClick } = useContext(RecipesContext);

  const [hideSearch, setHideSearch] = useState(false);

  function typeRecipes() {
    if (title === 'Foods') {
      return 'Meal';
    }
    return 'Cocktail';
  }

  pagesTitle.forEach((pages) => {
    if (pages === title) {
      isRend = false;
    }
  });

  return (
    <header className="box-header">
      <div className="box-bnt-title-header">
        <div className="box-profile-icon">
          <Link to="/profile">
            <img src={ ProfileIcon } alt="icone perfil" data-testid="profile-top-btn" />
          </Link>
        </div>
        <div data-testid="page-title" className="box-title">
          <h1>{ title }</h1>
        </div>
        <div className="box-btn-search">
          {
            isRend
          && (
            <button
              className="btn-search"
              type="button"
              onClick={ () => setHideSearch(!hideSearch) }
            >
              <img
                src={ SearchIcon }
                alt="icone perfil"
                data-testid="search-top-btn"
              />
            </button>)
          }
        </div>
      </div>
      <div className="box-search">
        {
          (hideSearch)
            ? (
              <>
                <input
                  type="text"
                  name="search"
                  data-testid="search-input"
                  className="box-input-search"
                  value={ search }
                  onChange={ ({ target: { value } }) => setSearch(value) }
                />
                <div className="box-option-search">
                  <label htmlFor="ingrediente" className="box-label-search">
                    <input
                      className="box-radio-search"
                      type="radio"
                      name="search"
                      id={ `fetch${typeRecipes()}ByIngredient` }
                      data-testid="ingredient-search-radio"
                      onChange={ returnSelectedOption }
                    />
                    Ingrediente
                  </label>
                  <label htmlFor="nome" className="box-label-search">
                    <input
                      className="box-radio-search"
                      type="radio"
                      name="search"
                      id={ `fetch${typeRecipes()}ByName` }
                      data-testid="name-search-radio"
                      onChange={ returnSelectedOption }
                    />
                    Nome
                  </label>
                  <label htmlFor="primeiraLetra" className="box-label-search">
                    <input
                      className="box-radio-search"
                      type="radio"
                      name="search"
                      id={ `fetch${typeRecipes()}ByFirstLetter` }
                      data-testid="first-letter-search-radio"
                      onChange={ returnSelectedOption }
                    />
                    Primeira Letra
                  </label>
                  <button
                    className="btn-box-search"
                    type="button"
                    data-testid="exec-search-btn"
                    onClick={ onClick }
                  >
                    Search
                  </button>
                </div>
              </>
            )
            : ''
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
