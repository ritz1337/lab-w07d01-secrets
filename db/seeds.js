var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';

var secrets = [
  {message: 'i let the dogs out', likes: 0},
  {message: 'i have another family in canada', likes: 0},
];

var lies = [
  {statement: "today is my birthday", truth: "it isn't my birthday"},
  {statement: "pizza is my favorite food", truth: "it's ok"}
];

mongo.connect(url, function(err, db) {
  console.log('emptying collection');
  db.collection('secrets').remove({}, function(err, result) {
    console.log('seeding collection');
    db.collection('secrets').insert(secrets, function(err, result) {
      console.log(result);
      db.collection('lies').remove({}, function(err, result) {
        db.collection('lies').insert(lies, function(err, result) {
          db.close();
          console.log(result);
          process.exit();
        });
      });
    });
  });
});
