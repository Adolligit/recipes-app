import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI, fetchByCategories } from '../helpers/fetchAPI';

const MAGIC_NUMBER = 5;

function Foods() {
  const {
    selectedOption,
    dataRecipes,
    dataReturnRecipes,
    setFunctions: { setDataRecipes, setDataCategory },
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
      fetchAPI('fetchMealByName', '').then((data) => setDataRecipes(data));
    }
    fetchAPI('fetchMealListCategory', '').then((data) => setCategories(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDataRecipes, setDataCategory]);

  function getFilterCategory({ target: { value } }) {
    if ((filterBy === '' || filterBy !== value) && value !== 'All') {
      fetchByCategories('meal', value).then((data) => setDataRecipes(data));
      setFilterBy(value);
    } else {
      fetchAPI('fetchMealByName', '').then((data) => setDataRecipes(data));
      setFilterBy('');
    }
  }

  return (
    <>
      <Header title="Foods" />
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
        { isOneRecipe && <Redirect to={ `/foods/${dataRecipes[0].idMeal}` } /> }
        <RecipeCard recipeType="foods" />
        { noRecipes && global.alert(`${message}`) }
      </div>
      <Footer />
    </>
  );
}

export default Foods;
