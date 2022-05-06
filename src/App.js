import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import InProgress from './pages/InProgress';
import Nationalities from './pages/Nationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Ingredients from './pages/Ingredients';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route
          exact
          path="/foods/:id"
          render={ (props) => <Details { ...props } /> }
        />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <Details { ...props } /> }
        />
        <Route
          exact
          path="/foods/id-da-receita:/in-progress"
          render={ (props) => <InProgress { ...props } /> }
        />
        <Route
          exact
          path="/drinks/id-da-receita:/in-progress"
          render={ (props) => <InProgress { ...props } /> }
        />
        <Route exact path="/explore" component={ Explore } />
        <Route
          exact
          path="/explore/foods"
          render={ (props) => <ExploreFoods { ...props } /> }
        />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ Ingredients } />
        <Route exact path="/explore/drinks/ingredients" component={ Ingredients } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
