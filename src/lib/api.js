import fetch from 'isomorphic-fetch';

function login(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name: options.name,
      password: options.password,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      if (response.status === 403) {
        throw new Error('Forbidden');
      } else if (response.status === 400) {
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

function getUser(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/user`, {
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

function logout(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/logout`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status === 403) {
      throw new Error('Forbidden');
    } else if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then(() => Promise.resolve())
  .catch((err) => Promise.reject(err.message));
}

function getUsers(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/users`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status === 403) {
      throw new Error('Forbidden');
    } else if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((items) => Promise.resolve(items))
  .catch((err) => Promise.reject(err.message));
}

function getRoles(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/roles`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status === 403) {
      throw new Error('Forbidden');
    } else if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((items) => Promise.resolve(items))
  .catch((err) => Promise.reject(err.message));
}

function getAccessTypes(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/accesstypes`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status === 403) {
      throw new Error('Forbidden');
    } else if (response.status !== 200) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((items) => Promise.resolve(items))
  .catch((err) => Promise.reject(err.message));
}

// интерфейс для администрирования

function updateAccessType(id, options) {
  return fetch(
    `${(options && options.basename) ? options.basename : ''}/accesstypes/${id}/update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(options),
    }).then((response) => {
      if (response.status !== 200) {
        if (response.status === 403) {
          throw new Error('Forbidden');
        } else if (response.status === 304) {
          throw new Error('Not Modified');
        } else if (response.status === 404) {
          throw new Error('Not Found');
        }

        throw new Error('Bad response from server');
      }
      return response.json();
    }
  )
  .then((accessType) => Promise.resolve(accessType))
  .catch((err) => Promise.reject(err.message));
}

function deleteAccessType(id, options) {
  return fetch(
    `${(options && options.basename) ? options.basename : ''}/accesstypes/${id}/delete`, {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        if (response.status === 403) {
          throw new Error('Forbidden');
        } else if (response.status === 304) {
          throw new Error('Not Modified');
        } else if (response.status === 404) {
          throw new Error('Not Found');
        }

        throw new Error('Bad response from server');
      }
      return response.json();
    }
  )
  .then((accessType) => Promise.resolve(accessType))
  .catch((err) => Promise.reject(err.message));
}

function createAccessType(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/accesstypes/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(options),
  }).then((response) => {
    if (response.status !== 200) {
      if (response.status === 403) {
        throw new Error('Forbidden');
      } else if (response.status === 409) {
        throw new Error('Conflict');
      }

      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((accessType) => Promise.resolve(accessType))
  .catch((err) => Promise.reject(err.message));
}

function signup(options) {
  return fetch(`${(options && options.basename) ? options.basename : ''}/${options.name}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name: options.name,
      password: options.password,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      if (response.status === 403) {
        throw new Error('Forbidden');
      } else if (response.status === 400) {
        throw new Error('Bad Request');
      } else if (response.status === 404) {
        throw new Error('Not Found');
      } else if (response.status === 304) {
        throw new Error('Not Found');
      }

      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((profile) => Promise.resolve(profile))
  .catch((err) => Promise.reject(err.message));
}

export default {
  login,
  getUser,
  logout,
  getUsers,
  getRoles,
  getAccessTypes,
  updateAccessType,
  deleteAccessType,
  createAccessType,
  signup,
};
