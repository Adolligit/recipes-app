import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import fetchAPI from '../helpers/fetchAPI';

function Drinks() {
  const {
    selectedOption,
    dataRecipes,
    dataReturnRecipes,
    setFunctions: { setDataRecipes },
  } = useContext(RecipesContext);

  const optionSelected = selectedOption === 'fetchMealByName'
    || selectedOption === 'fetchCocktailByName';

  const isOneRecipe = optionSelected && dataRecipes.length === 1;
  // const isMoreThanOneRecipe = dataRecipes.length > 1 && optionSelected;
  const noRecipes = dataReturnRecipes === 'emptyReturn';
  const message = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    fetchAPI('fetchCocktailByName', '').then((data) => setDataRecipes(data));
  }, [setDataRecipes]);

  return (
    <>
      <Header title="Drinks" />
      <div>
        { isOneRecipe && <Redirect to={ `/drinks/${dataRecipes[0].idDrink}` } /> }
        { <RecipeCard /> }
        { noRecipes && global.alert(`${message}`) }
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
