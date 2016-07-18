import express from 'express';

export default function (options) {
  const router = new express.Router();

  router.get('/auth/user', (req, res) => {
    // res.json(req.user);
    options.store.getUsers((err, data) => {
      if (err) {
        throw err;
      }

      const user = data.filter(item => item.name === 'Василий');

      if (user && user.length) {
        res.json(user[0]);
      }
    });
  });

  router.get('/auth/signin', (req, res) => {
    // res.json(req.user);
    options.store.getUsers((err, data) => {
      if (err) {
        throw err;
      }

      const user = data.filter(item => item.name === 'Василий');

      if (user && user.length) {
        res.json(user[0]);
      }
    });
  });

  router.get('/auth/roles', (req, res) => {
    options.store.getRoles((err, data) => {
      res.json(data);
    });
  });

  router.get('/auth/users', (req, res) => {
    options.store.getUsers((err, data) => {
      res.json(data);
    });
  });

  router.get('/auth/access-types', (req, res) => {
    options.store.getAccessTypes((err, data) => {
      res.json(data);
    });
  });

  return router;
}
