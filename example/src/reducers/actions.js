import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function loadTest1Complete(items) {
  return {
    type: types.LOAD_TEST1_COMPLETE,
    items,
  };
}

export function loadTest1Failed(error) {
  return {
    type: types.LOAD_TEST1_FAILED,
    error,
  };
}

export function loadTest1() {
  return dispatch => {
    dispatch({
      type: types.LOAD_TEST1,
    });

    fetch('/rest/test1').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadTest1Complete(items));
    });
  };
}

export function loadTest2Complete(items) {
  return {
    type: types.LOAD_TEST2_COMPLETE,
    items,
  };
}

export function loadTest2Failed(error) {
  return {
    type: types.LOAD_TEST2_FAILED,
    error,
  };
}

export function loadTest2() {
  return dispatch => {
    dispatch({
      type: types.LOAD_TEST2,
    });

    fetch('/rest/test2').then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadTest2Complete(items));
    });
  };
}

export function insertTest2Complete(item) {
  return {
    type: types.INSERT_TEST2_COMPLETE,
    item,
  };
}

export function insertTest2Failed(error) {
  return {
    type: types.INSERT_TEST2_FAILED,
    error,
  };
}

export function insertTest2(newItem) {
  return dispatch => {
    dispatch({
      type: types.INSERT_TEST2,
    });

    fetch('/rest/test2', {
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
      dispatch(insertTest2Complete(item));
    });
  };
}

export function insertTest1Complete(item) {
  return {
    type: types.INSERT_TEST1_COMPLETE,
    item,
  };
}

export function insertTest1Failed(error) {
  return {
    type: types.INSERT_TEST1_FAILED,
    error,
  };
}

export function insertTest1(newItem) {
  return dispatch => {
    dispatch({
      type: types.INSERT_TEST1,
    });

    fetch('/rest/test1', {
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
      dispatch(insertTest1Complete(item));
    });
  };
}
