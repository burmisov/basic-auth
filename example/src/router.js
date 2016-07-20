import express from 'express';
import Datastore from 'nedb';
import path from 'path';

import createStore from './JSONStore';
import { createRouterMiddlewares, checkAccess } from '../../src';

const router = new express.Router();

router.use(createRouterMiddlewares(
  createStore(path.join(__dirname, '../data/store.json'))
));

const db = {};

db.layers = new Datastore('/data/layers.db');

db.layers.loadDatabase();

router.get('/api/layers', (req, res) => {
  db.layers.find({}, (err, docs) => {
    if (err) {
      res.sendStatus(500);
    }

    res.json(docs.filter(item => checkAccess(req.user, 'viewing', item.id)));
  });
});

export default router;
