import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LogoApp from '../images/num-e-so-pave-logo.svg';
import '../css/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  function validate() {
    const pattern = /\S+@\S+\.\S+/;
    const lengthPassword = 6;

    return pattern.test(email) && password.length >= lengthPassword;
  }

  function handleChange({ target: { name, value } }) {
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }

    setDisabledButton(!validate());
  }

  function submitForm() {
    const arr = JSON.stringify([]);
    const obj = JSON.stringify({ cocktails: {}, meals: {} });

    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    localStorage.user = JSON.stringify({ email });
    localStorage.doneRecipes = arr;
    localStorage.favoriteRecipes = arr;
    localStorage.inProgressRecipes = obj;

    history.push('/foods');
  }

  return (
    <section className="box-login">
      <div className="logo-app">
        <img src={ LogoApp } alt="Logo App" />
      </div>
      <form className="form-login">
        <input
          className="txt-login"
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
        />
        <input
          className="txt-login"
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChange }
          minLength="6"
        />
        <input
          className={ disabledButton ? 'btn-login-disable' : 'btn-login' }
          type="button"
          data-testid="login-submit-btn"
          value="Enter"
          onClick={ submitForm }
          disabled={ disabledButton }
        />
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(),
}.isRequerid;

export default Login;
