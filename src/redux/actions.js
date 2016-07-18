import * as types from './actionTypes';
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

export function signIn() {
  return dispatch => {
    dispatch({
      type: types.SIGN_IN,
    });

    fetch('/auth/signin').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(signInComplete(profile));
    });
  };
}
