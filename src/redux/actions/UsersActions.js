import * as types from './ActionTypes';
import fetch from 'isomorphic-fetch';

export function loadUsersComplete(items) {
  return {
    type: types.LOAD_USERS_COMPLETE,
    items,
  };
}

export function loadUsersFailed(error) {
  return {
    type: types.LOAD_USERS_FAILED,
    error,
  };
}

export function loadUsers() {
  return dispatch => {
    dispatch({
      type: types.LOAD_USERS,
    });

    fetch('/auth/users').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadUsersComplete(items));
    });
  };
}
