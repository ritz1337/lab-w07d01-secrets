var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'lies';
var router = express.Router(); // router is the return value of the function Router which is a method on express

router.get('/', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).find({}).toArray(function(err, lies_results) {
      db.close();
      res.render('lies', {lies: lies_results})
    })
  })
})

router.get('/new', function(req, res) {
  res.render('newlie');
});

router.post('/', function(req, res) {
  var liestatement = req.body.newlie;
  var newlie = {
    statement: liestatement,
    truth: null
  }
  mongo.connect(url, function(err, db) {
    db.collection(collection).insert(newlie, function(err, results) {
      db.close();
      res.redirect(301, '/lies')
    })
  })
})

module.exports = router;
