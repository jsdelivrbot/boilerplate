import axios from 'axios';
import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from './types';

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }, history) {
  // We can return a function instead of object only because of reduxThunk
  // so we can implement asynchronous logic and once this is handled, we can
  // send the dispatch the result to middlewares and reducers
  return function(dispatch) {
    // Submit credetials to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then((res) => {
        // if req is good, update:
        // - state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - save JWT token in the local storage of the browser
        localStorage.setItem('token', res.data.token);
        // - redircet to protected route '/feature'
        history.push('/feature');
      })
      .catch((err) => {
        // If req is bad
        // - show error
        dispatch(authError('Bad login info'));
      });
  }
}

export function signupUser({ email, password }, history) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then((res) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        history.push('/feature');
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error));
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: DEAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        })
      });
  }
}
