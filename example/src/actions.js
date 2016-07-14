import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function loadLayersComplete(items) {
  return {
    type: types.LOAD_LAYERS_COMPLETE,
    items,
  };
}

export function loadLayersFailed(error) {
  return {
    type: types.LOAD_LAYERS_FAILED,
    error,
  };
}

export function loadLayers() {
  return dispatch => {
    dispatch({
      type: types.LOAD_LAYERS,
    });

    fetch('/api/layers').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadLayersComplete(items));
    });
  };
}

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

    fetch('/api/users').then((response) => {
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

export function insertUserComplete(item) {
  return {
    type: types.INSERT_USER_COMPLETE,
    item,
  };
}

export function insertUserFailed(error) {
  return {
    type: types.INSERT_USER_FAILED,
    error,
  };
}

export function insertUser(newItem) {
  return dispatch => {
    dispatch({
      type: types.INSERT_USER,
    });

    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((item) => {
      dispatch(insertUserComplete(item));
    });
  };
}

export function insertLayerComplete(item) {
  return {
    type: types.INSERT_LAYER_COMPLETE,
    item,
  };
}

export function insertLayerFailed(error) {
  return {
    type: types.INSERT_LAYER_FAILED,
    error,
  };
}

export function insertLayer(newItem) {
  return dispatch => {
    dispatch({
      type: types.INSERT_LAYER,
    });

    fetch('/api/layers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((item) => {
      dispatch(insertLayerComplete(item));
    });
  };
}
