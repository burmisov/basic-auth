/* eslint no-param-reassign: ["error", { "props": false }]*/

import session from 'express-session';

export default function (store) {
  const sessionMiddleware = session({
    secret: 'geoworks-auth',
    resave: false,
    saveUninitialized: false,
  });

  function autoLoginMiddleware(req, res, next) {
    store.getUsers((err, data) => {
      if (err) {
        throw err;
      }

      let user;

      if (req.session.userId) {
        user = data.filter(item => item.id === req.session.userId);

        if (user && user.length) {
          req.user = user[0];
        }
      } else {
        user = data.filter(item => item.name === 'public');

        if (user && user.length) {
          req.user = user[0];
        }
      }

      return next();
    });
  }

  return [sessionMiddleware, autoLoginMiddleware];
}
