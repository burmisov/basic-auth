import session from 'express-session';
import buildRouter from './lib/buildRouter';

export default function (app, options) {
  const sessionMiddleware = session({
    secret: 'geoworks-auth',
    resave: false,
    saveUninitialized: false,
  });

  function autoLoginMiddleware(req, res, next) {
    options.store.getUsers((err, data) => {
      if (err) {
        throw err;
      }

      let user;

      if (req.session.userId) {
        user = data.filter(item => item.id === req.session.userId);

        if (user && user.length) {
          req.user = user[0];

          return next();
        }
      } else {
        user = data.filter(item => item.name === 'public');

        if (user && user.length) {
          req.user = user[0];

          return next();
        }
      }
    });
  }

  app.use(sessionMiddleware);
  app.use(autoLoginMiddleware);
  app.use(buildRouter(options));
}
