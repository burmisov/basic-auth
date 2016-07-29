import * as types from './types';
import api from '../../lib/api';

let basename;

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

function login(options) {
  return dispatch => {
    dispatch({
      type: types.LOGIN,
    });

    api.login({
      basename: (options && options.basename) || basename,
      name: options.name, password: options.password,
    })
      .then((profile) => {
        dispatch(loginComplete(profile));
      })
      .catch((err) => {
        dispatch(loginFailed(err));
      })
    ;
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

function loadUser(options) {
  return dispatch => {
    dispatch({
      type: types.LOAD_USER,
    });

    api.getUser({ basename: (options && options.basename) || basename })
      .then((profile) => {
        dispatch(loadUserComplete(profile));
      })
      .catch((err) => {
        dispatch(loadUserFailed(err));
      })
    ;
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

function logout(options) {
  return dispatch => {
    dispatch({
      type: types.LOGOUT,
    });

    api.logout({ basename: (options && options.basename) || basename })
      .then(() => {
        dispatch(logoutComplete());
      })
      .catch((err) => {
        dispatch(logoutFailed(err));
      })
    ;
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

function loadUsers(options) {
  return dispatch => {
    dispatch({
      type: types.LOAD_USERS,
    });

    api.getUsers({ basename: (options && options.basename) || basename })
      .then((items) => {
        dispatch(loadUsersComplete(items));
      })
      .catch((err) => {
        dispatch(loadUsersFailed(err));
      })
    ;
  };
}

function loadRolesComplete(items) {
  return {
    type: types.LOAD_ROLES_COMPLETE,
    items,
  };
}

function loadRolesFailed(error) {
  return {
    type: types.LOAD_ROLES_FAILED,
    error,
  };
}

function loadRoles(options) {
  return dispatch => {
    dispatch({
      type: types.LOAD_ROLES,
    });

    api.getRoles({ basename: (options && options.basename) || basename })
      .then((items) => {
        dispatch(loadRolesComplete(items));
      })
      .catch((err) => {
        dispatch(loadRolesFailed(err));
      })
    ;
  };
}

function loadAccessTypesComplete(items) {
  return {
    type: types.LOAD_ACCESSTYPES_COMPLETE,
    items,
  };
}

function loadAccessTypesFailed(error) {
  return {
    type: types.LOAD_ACCESSTYPES_FAILED,
    error,
  };
}

function loadAccessTypes(options) {
  return dispatch => {
    dispatch({
      type: types.LOAD_ACCESSTYPES,
    });

    api.getAccessTypes({ basename: (options && options.basename) || basename })
      .then((items) => {
        dispatch(loadAccessTypesComplete(items));
      })
      .catch((err) => {
        dispatch(loadAccessTypesFailed(err));
      })
    ;
  };
}

export default (path) => {
  basename = path ? path.replace(/^\/|\/$/g, '') : '';

  return {
    login,
    logout,
    loadUsers,
    loadUser,
    loadRoles,
    loadAccessTypes,
  };
};
