import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import { fetchAPI, fetchByCategories } from '../helpers/fetchAPI';

const MAGIC_NUMBER = 5;

function Drinks() {
  const {
    selectedOption,
    dataRecipes,
    dataReturnRecipes,
    setFunctions: { setDataRecipes },
  } = useContext(RecipesContext);

  const [categories, setCategories] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  const optionSelected = selectedOption === 'fetchMealByName'
    || selectedOption === 'fetchCocktailByName';

  const isOneRecipe = optionSelected && dataRecipes.length === 1;
  // const isMoreThanOneRecipe = dataRecipes.length > 1 && optionSelected;
  const noRecipes = dataReturnRecipes === 'emptyReturn';
  const message = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    if (!dataRecipes.length) {
      fetchAPI('fetchCocktailByName', '').then((data) => setDataRecipes(data));
    }
    fetchAPI('fetchCocktailListCategory', '').then((data) => setCategories(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDataRecipes]);

  function getFilterCategory({ target: { value } }) {
    if ((filterBy === '' || filterBy !== value) && value !== 'All') {
      fetchByCategories('cocktail', value).then((data) => setDataRecipes(data));
      setFilterBy(value);
    } else {
      fetchAPI('fetchCocktailByName', '').then((data) => setDataRecipes(data));
      setFilterBy('');
    }
  }

  return (
    <>
      <Header title="Drinks" />
      <div className="box-filters-category">
        <ul className="list-filters-category">
          <li>
            <input
              type="button"
              className="filter-category"
              data-testid="All-category-filter"
              value="All"
              onClick={ getFilterCategory }
            />
          </li>
          {
            categories.map(({ strCategory }) => (
              <li key={ strCategory }>
                <input
                  type="button"
                  className="filter-category"
                  data-testid={ `${strCategory}-category-filter` }
                  value={ `${strCategory}` }
                  onClick={ getFilterCategory }
                />
              </li>
            )).slice(0, MAGIC_NUMBER)
          }
        </ul>
      </div>
      <div className="box-principal">
        { isOneRecipe && <Redirect to={ `/drinks/${dataRecipes[0].idDrink}` } /> }
        { <RecipeCard recipeType="drinks" /> }
        { noRecipes && global.alert(`${message}`) }
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
