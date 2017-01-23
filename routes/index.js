var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'secrets';
var router = express.Router();

router.get('/', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).find({}).toArray(function(err, secrets) {
      db.close();
      res.render('index', {secrets: secrets, secretsJSON: JSON.stringify(secrets)});
    });
  });
});

module.exports = router;
