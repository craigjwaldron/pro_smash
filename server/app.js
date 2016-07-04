console.log('hello from app.js');

var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();

// pulling in file
var passport = require('../strategies/user-local.js');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));

// Setting static page
app.use(express.static('public'));

app.use(session({
  secret: 'secret',  //could be any string
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// require routers. making the connection to index.js router. PULLING IN INDEX AND STORING IN INDEX
var index = require('../routes/index');
var register = require('../routes/register');

// let server file know how to use the index file. IN ANY ROUTES WE WANT TO GO TO INDEX FILE
app.use('/register', register);
app.use('/*', index); // login page

// Spinning up the server
app.listen(3000, function(){
  console.log('listening on server 3000');
});
