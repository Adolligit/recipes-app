import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function Ingredients({ history }) {
  return (
    <>
      <Header title="Explore Ingredients" />
      <IngredientCard history={ history } />
      <Footer />
    </>
  );
}

Ingredients.propTypes = {
  history: PropTypes.objectOf(),
}.isRequerid;

export default Ingredients;
