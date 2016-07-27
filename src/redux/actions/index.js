import * as types from './types';
import fetch from 'isomorphic-fetch';

let base;

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

    fetch(`${base}/login`, {
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
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(loginComplete(profile));
    })
    .catch((err) => {
      dispatch(loginFailed(err.message));
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

    fetch(`${base}/user`, {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((profile) => {
      dispatch(loadUserComplete(profile));
    })
    .catch((err) => {
      dispatch(loadUserFailed(err.message));
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

    fetch(`${base}/logout`, {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(() => {
      dispatch(logoutComplete());
    })
    .catch((err) => {
      dispatch(logoutFailed(err.message));
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

    fetch(`${base}/users`, {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadUsersComplete(items));
    })
    .catch((err) => {
      dispatch(loadUsersFailed(err.message));
    });
  };
}

export default (basename) => {
  base = basename ? basename.replace(/^\/|\/$/g, '') : '';

  return {
    login,
    logout,
    loadUsers,
    loadUser,
  };
};
