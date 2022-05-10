import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Details from './pages/Details';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Ingredients from './pages/Ingredients';
import InProgress from './pages/InProgress';
import Login from './pages/Login';
import Nationalities from './pages/Nationalities';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/foods/:id/in-progress"
          render={ (props) => <InProgress { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <InProgress { ...props } /> }
        />
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
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
