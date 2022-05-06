import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Explorer from '../components/Explorer';

function ExploreFoods({ history }) {
  return (
    <>
      <Header title="Explore Foods" />
      <Explorer linkTo="foods" history={ history } />
      <Footer />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(),
}.isRequerid;

export default ExploreFoods;
