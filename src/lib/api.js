import fetch from 'isomorphic-fetch';

function login(base, name, password) {
  return fetch(`${base}/login`, {
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
      if (response.status === 400) {
        throw new Error('Bad Request');
      } else if (response.status === 404) {
        throw new Error('Not Found');
      }

      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((profile) => Promise.resolve(profile))
  .catch((err) => Promise.reject(err.message));
}

function getUser(base) {
  return fetch(`${base}/user`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      if (response.status === 403) {
        throw new Error('Forbidden');
      }

      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((profile) => Promise.resolve(profile))
  .catch((err) => Promise.reject(err.message));
}

function logout(base) {
  return fetch(`${base}/logout`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then(() => Promise.resolve())
  .catch((err) => Promise.reject(err.message));
}

function getUsers(base) {
  return fetch(`${base}/users`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((items) => Promise.resolve(items))
  .catch((err) => Promise.reject(err.message));
}

function getRoles(base) {
  return fetch(`${base}/roles`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((items) => Promise.resolve(items))
  .catch((err) => Promise.reject(err.message));
}

function getAccessTypes(base) {
  return fetch(`${base}/accesstypes`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((items) => Promise.resolve(items))
  .catch((err) => Promise.reject(err.message));
}

export default {
  login,
  getUser,
  logout,
  getUsers,
  getRoles,
  getAccessTypes,
};
