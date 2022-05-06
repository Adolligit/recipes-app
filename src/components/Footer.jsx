import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';
// import RecipesContext from '../context/RecipesContext';

const Footer = () => (
  <footer
    data-testid="footer"
    className="box-footer"
  >
    <div>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="icone drinks" data-testid="drinks-bottom-btn" />
      </Link>
    </div>
    <div>
      <Link to="/explore">
        <img src={ exploreIcon } alt="icone explorar" data-testid="explore-bottom-btn" />
      </Link>
    </div>
    <div>
      <Link to="/foods">
        <img src={ mealIcon } alt="icone meals" data-testid="food-bottom-btn" />
      </Link>
    </div>
  </footer>
);

export default Footer;
