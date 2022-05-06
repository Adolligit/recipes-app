import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFoods from '../images/fundo-btn-explore-foods.png';
import ExploreDrinks from '../images/fundo-btn-explore-drinks.png';
import '../css/Explore.css';

function Explore({ history }) {
  return (
    <>
      <Header title="Explore" />
      <div className="box-explore">
        <button
          className="btn-explore-food"
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          <div className="title-btn-explore">
            Explore Foods
          </div>
          <img
            src={ ExploreFoods }
            alt="imagem comida"
          />
        </button>
        <button
          className="btn-explore-food"
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          <div className="title-btn-explore">
            Explore Drinks
          </div>
          <img
            src={ ExploreDrinks }
            alt="imagem comida"
          />
        </button>
      </div>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.objectOf(),
}.isRequerid;

export default Explore;
