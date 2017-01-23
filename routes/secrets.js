var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'secrets';
var router = express.Router();

router.post('/', function(req, res) {
  var newTweet = {
    message: req.body.message,
    likes: 0
  }
  mongo.connect(url, function(err, db) {
    db.collection(collection).insert(newTweet, function(err, result) {
      db.close();
      res.json(result);
    });
  });
});

router.post('/:id/likes', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection(collection).findAndModify(
      {_id: ObjectID(id)},
      {},
      {$inc: {likes: 1}},
      {new: true},
      function(err, result) {
        db.close();
        res.json(result);
      });
  });
});

// HTTP DELETE Methods
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









