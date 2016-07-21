import * as types from './ActionTypes';
import fetch from 'isomorphic-fetch';

export function signInComplete(profile) {
  return {
    type: types.SIGN_IN_COMPLETE,
    profile,
  };
}

export function signInFailed(error) {
  return {
    type: types.SIGN_IN_FAILED,
    error,
  };
}

export function signIn(name, password) {
  return dispatch => {
    dispatch({
      type: types.SIGN_IN,
    });

    fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    }).then((response) => {
      if (response.status !== 200) {
        dispatch(signInFailed('Bad response from server'));
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(signInComplete(profile));
    });
  };
}

export function loadUserComplete(profile) {
  return {
    type: types.LOAD_USER_COMPLETE,
    profile,
  };
}

export function loadUserFailed(error) {
  return {
    type: types.LOAD_USER_FAILED,
    error,
  };
}

export function loadUser() {
  return dispatch => {
    dispatch({
      type: types.LOAD_USER,
    });

    fetch('/api/auth/user').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(loadUserComplete(profile));
    });
  };
}

export function signOutComplete() {
  return {
    type: types.SIGN_OUT_COMPLETE,
  };
}

export function signOutFailed(error) {
  return {
    type: types.SIGN_OUT_FAILED,
    error,
  };
}

export function signOut() {
  return dispatch => {
    dispatch({
      type: types.SIGN_OUT,
    });

    fetch('/api/auth/signout').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(() => {
      dispatch(signOutComplete());
    });
  };
}
