var express = require('express');
var bodyParser = require('body-parser');
var hbs  = require('express-handlebars');

// db
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'secrets';

var app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var index = require('./routes/index');
var secrets = require('./routes/secrets');

app.use('/', index);
app.use('/secrets', secrets);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});




