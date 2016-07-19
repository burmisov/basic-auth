import express from 'express';
import Datastore from 'nedb';

const router = new express.Router();
const db = {};

db.layers = new Datastore('./data/layers.db');
db.users = new Datastore('./data/users.db');

db.layers.loadDatabase();
db.users.loadDatabase();

router.get('/api/layers', (req, res) => {
  db.layers.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.get('/api/users', (req, res) => {
  db.users.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.post('/api/layers', (req, res) => {
  db.layers.insert(req.body, (err, newDoc) => {
    res.json(newDoc);
  });
});

router.post('/api/users', (req, res) => {
  db.users.insert(req.body, (err, newDoc) => {
    res.json(newDoc);
  });
});

export default router;
