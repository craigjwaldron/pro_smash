
console.log('hello from app.js');

var path = require('path');
var express = require('express');
var router = express.Router();

var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();
var connectionStringUsers = 'postgres://localhost:5432/pro_smash_users';
var connectionString = "postgres://localhost:5432/pro_smash_tasks";

//passport connection
var passport = require('./strategies/user.sql.js');
var session = require('express-session');

var moment = require('moment');
moment().format();

//Route inclusion
var login = require('./routes/login');
var register = require('./routes/register');
var router = require('./routes/routes');

// //Route inclusion
var sundayRoute = require('./routes/sundayRoute');
var mondayRoute = require('./routes/sundayRoute');
var tuesdayRoute = require('./routes/tuesdayRoute');
var wednesdayRoute = require('./routes/wednesdayRoute');
var thursdayRoute = require('./routes/thursdayRoute');
var fridayRoute = require('./routes/fridayRoute');
var saturdayRoute = require('./routes/saturdayRoute');


app.use(bodyParser.json());

// Setting static page
app.use(express.static( 'public' ));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/router', router);
app.use('/login', login);
app.use('/', login);
app.use('/', router);
app.use('/sundayRoute', sundayRoute );
app.use('/mondayRoute', mondayRoute );
app.use('/tuesdayRoute', tuesdayRoute );
app.use('/wednesdayRoute', wednesdayRoute );
app.use('/thursdayRoute', thursdayRoute );
app.use('/fridayRoute', fridayRoute );
app.use('/saturdayRoute', saturdayRoute );


// base url
router.get( '/', function ( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
});

// Spinning up the server
app.listen(3000, function(){
  console.log('listening on server 3000');
});
