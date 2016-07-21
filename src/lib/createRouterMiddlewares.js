/* eslint no-shadow: ["error", { "allow": ["err"] }]*/
import checkAccess from './checkAccess';

export default function (store, basename) {
  const base = basename || '';

  function getUserRouterMiddleware(req, res, next) {
    if (req.method === 'GET' && req.path === `/${base}/auth/user`) {
      if (req.user) {
        res.json(req.user);
      } else {
        res.sendStatus(401);
        // сделать res.redirect и вынести в настройки куда редиректиться при случае
      }
    }

    next();
  }

  function postSignInRouterMiddleware(req, res, next) {
    if (req.method === 'POST' && req.path === `/${base}/auth/signin`) {
      store.getUsers((err, users) => {
        if (err) {
          res.sendStatus(500);
        }

        store.getRoles((err, roles) => {
          if (err) {
            res.sendStatus(500);
          }

          const user = users.filter(item => item.name === req.body.name);

          if (user && user.length) {
            if (user[0].passwordHash === req.body.password) {
              let mapping = [];

              if (roles) {
                mapping = roles.filter(role => role.userIds.indexOf(user[0].id) > -1);
              }

              res.json({
                ...user[0],
                roles: mapping,
              });
            } else {
              res.sendStatus(403);
            }
          } else {
            res.sendStatus(404);
          }
        });
      });
    } else {
      next();
    }
  }

  function getRolesRouterMiddleware(req, res, next) {
    if (req.method === 'GET' && req.path === `/${base}/auth/roles`) {
      store.getRoles((err, data) => {
        if (err) {
          res.sendStatus(500);
        }

        res.json(data.filter(item => checkAccess(req.user, 'viewing', item.id)));
      });
    } else {
      next();
    }
  }

  function getUsersRouterMiddleware(req, res, next) {
    if (req.method === 'GET' && req.path === `/${base}/auth/users`) {
      store.getUsers((err, users) => {
        if (err) {
          res.sendStatus(500);
        }

        store.getRoles((err, roles) => {
          if (err) {
            res.sendStatus(500);
          }

          const mapping = {};

          roles.forEach((role) => {
            if (role.userIds) {
              role.userIds.forEach((userId) => {
                if (mapping[userId]) {
                  mapping[userId].push(roles);
                } else {
                  mapping[userId] = [role];
                }
              });
            }
          });

          res.json(users.filter(item => checkAccess(req.user, 'viewing', item.id))
            .map(item => ({ ...item, roles: mapping[item.id] }))
          );
        });
      });
    } else {
      next();
    }
  }

  return [
    getUserRouterMiddleware,
    postSignInRouterMiddleware,
    getRolesRouterMiddleware,
    getUsersRouterMiddleware,
  ];
}
