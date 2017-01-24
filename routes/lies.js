var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'lies';
var router = express.Router();

router.get('/', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).find({}).toArray(function(err, results) {
      db.close();
      res.render('lies/index', {lies: results})
    });
  })
});

router.get('/new', function(req, res) {
  res.render('lies/new');
});

router.post('/', function(req, res) {
  var newLie = {
    statement: req.body.statement,
    truth: req.body.truth
  }
  mongo.connect(url, function(err, db) {
    db.collection(collection).insert(newLie, function(err, result) {
      db.close();
      res.redirect('/lies');
    });
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection(collection).findOne({_id: ObjectID(id)}, function(err, lie) {
      res.render('lies/show', {lie: lie});
    })
  });
});

router.get('/:id/edit', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection(collection).findOne({_id: ObjectID(id)}, function(err, lie) {
      res.render('lies/edit', {lie: lie});
    });
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatedLie = {
    statement: req.body.statement,
    truth: req.body.truth,
  }
  mongo.connect(url, function(err, db) {
    db.collection(collection).findAndModify(
      {_id: ObjectID(id)},
      {},
      updatedLie,
      {new: true},
      function(err, result) {
        db.close();
        res.redirect('/lies/' + id);
      });
  })
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection(collection).remove({_id: ObjectID(id)}, function(err, result) {
      db.close();
      res.json(result);
    });
  });
});

module.exports = router;
