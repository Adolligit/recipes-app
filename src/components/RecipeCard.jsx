import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../css/RecipeCard.css';

const MAGIC_NUMBER = 12;

const RecipeCard = ({ recipeType }) => {
  const { dataRecipes } = useContext(RecipesContext);

  const idRecipeType = (recipeType === 'foods') ? 'idMeal' : 'idDrink';

  return (
    dataRecipes
      .map((element, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="box-recipe-card"
        >
          <Link to={ `/${recipeType}/${element[idRecipeType]}` }>
            <div
              data-testid={ `${index}-card-name` }
              className="box-title-recipe-card"
            >
              {element.strMeal || element.strDrink}
            </div>
            <div className="box-img-recipe-card">
              <img
                alt={ element.strMeal || element.strDrink }
                src={ element.strMealThumb || element.strDrinkThumb }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        </div>
      )).slice(0, MAGIC_NUMBER)
  );
};

export default RecipeCard;
