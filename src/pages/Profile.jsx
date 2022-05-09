import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  const email = (localStorage.user) ? JSON.parse(localStorage.user).email : 'email';

  return (
    <>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{ email }</h3>
      <div id="buttons-profile">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = { history: PropTypes.objectOf() }.isRequered;

export default Profile;
