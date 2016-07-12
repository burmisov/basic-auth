import express from 'express';
import Datastore from 'nedb';

const router = new express.Router();
const db = {};

db.test1 = new Datastore('./data/test1.db');
db.test2 = new Datastore('./data/test2.db');

db.test1.loadDatabase();
db.test2.loadDatabase();

router.get('/rest/test1', (req, res) => {
  db.test1.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.get('/rest/test2', (req, res) => {
  db.test2.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.post('/rest/test1', (req, res) => {
  db.test1.insert(req.body, (err, newDoc) => {
    res.json(newDoc);
  });
});

router.post('/rest/test2', (req, res) => {
  db.test2.insert(req.body, (err, newDoc) => {
    res.json(newDoc);
  });
});

export default router;
