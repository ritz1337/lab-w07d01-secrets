var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var router = express.Router();

router.get('/', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection('secrets').find({}).toArray(function(err, secrets) {
      db.collection('lies').find({}).toArray(function(err, lies) {
        db.close();
        res.render('index', {
          secrets: secrets,
          lies: lies
        });
      });
    });
  });
});

module.exports = router;
