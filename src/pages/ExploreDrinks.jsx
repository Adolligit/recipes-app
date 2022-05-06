import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Explorer from '../components/Explorer';

function ExploreDrinks({ history }) {
  return (
    <>
      <Header title="Explore Drinks" />
      <Explorer linkTo="drinks" history={ history } />
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(),
}.isRequerid;

export default ExploreDrinks;
