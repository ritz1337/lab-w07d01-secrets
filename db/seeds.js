// node db.seeds in terminal executes this file and populates the db with the below entries
 // npm run seed will make the seeds.js run [see package.json scripts]

var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = ['secrets', 'lies'];

var secrets = [
  {message: 'i let the dogs out', likes: 0},
  {message: 'i have another family in canada', likes: 0},
];

var lies = [
  {
    statement: "it was the biggest crowd ever",
    truth: "it wasn't."
  },
  {
    statement: "he was the smartest person ever",
    truth: "he wasn't."
  }
]

// for just 1 collection
// mongo.connect(url, function(err, db) {
//   console.log('emptying collection');
//   db.collection(collection).remove({}, function(err, result) {
//     console.log('seeding collection');
//     db.collection(collection).insert(secrets, function(err, result) {
//       db.close();
//       console.log(result);
//       process.exit(); //ends the process
//     });
//   })
// });


collection.forEach(function(c) {
 mongo.connect(url, function(err, db) {
 console.log('emptying collection');
 db.collection(c).remove({}, function(err, result) {
   console.log('seeding collection');
   if (c === 'secrets') {
     db.collection(c).insert(secrets, function(err, result) {
     db.close();
     console.log(result);
     process.exit(); // ends the process
   })
   } else if (c === 'lies') {
       db.collection(c).insert(lies, function(err, result) {
       db.close();
       console.log(result);
       process.exit(); // ends the process
     })
   }
 })
});

})
