import * as types from './types';
import fetch from 'isomorphic-fetch';

function loginComplete(profile) {
  return {
    type: types.LOGIN_COMPLETE,
    profile,
  };
}

function loginFailed(error) {
  return {
    type: types.LOGIN_FAILED,
    error,
  };
}

function login(name, password) {
  return dispatch => {
    dispatch({
      type: types.LOGIN,
    });

    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        password,
      }),
    }).then((response) => {
      if (response.status !== 200) {
        dispatch(loginFailed('Bad response from server'));
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(loginComplete(profile));
    });
  };
}

function loadUserComplete(profile) {
  return {
    type: types.LOAD_USER_COMPLETE,
    profile,
  };
}

function loadUserFailed(error) {
  return {
    type: types.LOAD_USER_FAILED,
    error,
  };
}

function loadUser() {
  return dispatch => {
    dispatch({
      type: types.LOAD_USER,
    });

    fetch('/api/user', {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        dispatch(loadUserFailed('Bad response from server'));
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(loadUserComplete(profile));
    });
  };
}

function logoutComplete() {
  return {
    type: types.LOGOUT_COMPLETE,
  };
}

function logoutFailed(error) {
  return {
    type: types.LOGOUT_FAILED,
    error,
  };
}

function logout() {
  return dispatch => {
    dispatch({
      type: types.LOGOUT,
    });

    fetch('/api/logout', {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        dispatch(logoutFailed('Bad response from server'));
      }
      return response.json();
    })
    .then(() => {
      dispatch(logoutComplete());
    });
  };
}

function loadUsersComplete(items) {
  return {
    type: types.LOAD_USERS_COMPLETE,
    items,
  };
}

function loadUsersFailed(error) {
  return {
    type: types.LOAD_USERS_FAILED,
    error,
  };
}

function loadUsers() {
  return dispatch => {
    dispatch({
      type: types.LOAD_USERS,
    });

    fetch('/api/users', {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        dispatch(loadUsersFailed('Bad response from server'));
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadUsersComplete(items));
    });
  };
}

export default {
  login,
  logout,
  loadUsers,
};
