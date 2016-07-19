/* eslint no-shadow: ["error", { "allow": ["err"] }]*/
import express from 'express';
import checkAccess from './checkAccess';

export default function (options) {
  const router = new express.Router();

  router.get('/auth/user', (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.sendStatus(401);
      // сделать res.redirect и вынести в настройки куда редиректиться при случае
    }
  });

  router.post('/auth/signin', (req, res) => {
    options.store.getUsers((err, users) => {
      if (err) {
        res.sendStatus(500);
      }

      options.store.getRoles((err, roles) => {
        if (err) {
          res.sendStatus(500);
        }

        const user = users.filter(item => item.name === req.body.name);

        if (user && user.length) {
          if (user.passwordHash === req.body.password) {
            let mapping = [];

            if (roles) {
              mapping = roles.filter(role => role.userIds.indexOf(user.id) > -1);
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
  });

  router.get('/auth/roles', (req, res) => {
    options.store.getRoles((err, data) => {
      if (err) {
        res.sendStatus(500);
      }

      res.json(data.filter(item => checkAccess(req.user, 'viewing', item.id)));
    });
  });

  router.get('/auth/users', (req, res) => {
    options.store.getUsers((err, users) => {
      if (err) {
        res.sendStatus(500);
      }

      options.store.getRoles((err, roles) => {
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
  });

  return router;
}
