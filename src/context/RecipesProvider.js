import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchAPI } from '../helpers/fetchAPI';

function RecipesProvider({ children }) {
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dataRecipes, setDataRecipes] = useState([]);
  const [dataReturnRecipes, setDataReturnRecipes] = useState('');

  async function onClick() {
    const returnAPI = await fetchAPI(selectedOption, search);
    if (returnAPI.length === 0) {
      setDataReturnRecipes('emptyReturn');
    }
    setDataReturnRecipes('');
    setDataRecipes(returnAPI);
  }

  function returnSelectedOption({ target }) {
    const { id } = target;
    setSelectedOption(id);
  }

  const contextValue = {
    search,
    setSearch,
    selectedOption,
    returnSelectedOption,
    onClick,
    dataRecipes,
    dataReturnRecipes,
    setFunctions: { setDataRecipes },
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
