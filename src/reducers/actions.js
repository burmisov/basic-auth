import * as types from './actionTypes';
// import fetch from 'isomorphic-fetch';
import uuid from 'uuid';

export function signInComplete(items) {
  return {
    type: types.SIGN_IN_COMPLETE,
    items,
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
    dispatch(signInComplete({
      id: uuid.v4(),
      roles: ['user'],
    }));
    // dispatch({
    //   type: types.SIGN_IN,
    // });
    //
    // fetch('/api/sign-in').then((response) => {
    //   if (response.status !== 200) {
    //     throw new Error('Bad response from server');
    //   }
    //   return response.json();
    // })
    // .then((items) => {
    //   dispatch(signInComplete(items));
    // });
  };
}
