console.log('hello from app.js');

var path = require('path');
var express = require('express');
var router = express.Router();

var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();
var connectionStringUsers = 'postgres://localhost:5432/pro_smash_users';
var connectionString = "postgres://localhost:5432/pro_smash_tasks";
var sundayRoute = require('./routes/sundayRoute');

//passport connection
var passport = require('./strategies/user.sql.js');
var session = require('express-session');

//Route inclusion
var login = require('./routes/login');
var register = require('./routes/register');
var router = require('./routes/routes');

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
app.use('/', sundayRoute );

// base url
router.get( '/', function ( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
});

// // New Task POST -------------------------------------------------------------------------------------------------------
// app.post ( "/sundayTask", function ( req, res ){
//   console.log( "hit createTask" );
// // Send new task to data base
//   pg.connect( connectionString, function( err, client, done ){
//     var query =  client.query ( "INSERT INTO user_task ( task_name, completed, day_due, week_due ) VALUES ( $1, $2, $3, $4 )", [ req.body.name, req.body.completed, req.body.day_due, req.body.week_due ] );
//       done();
//       query.on('end', function(){
//
//         console.log(req.body.name);
//
//         console.log("POST END");
//       return res.end();
//     }); // End query.on
//   }); // End of pg
// }); // End of post
//
// // --------------------------------------------------------
//
// // App.get to display on DOM
// app.get('/getSundayTasks', function( req, res){
//   console.log( "Hello from getTask app.get" );
//
//
//   pg.connect ( connectionString, function ( err, client, done ){
//     console.log("in DB");
//     var allTasks = [];
//
//     var taskQuery = client.query ( "SELECT * FROM user_task");
//
//     done();
//     var rows = 0;
//     taskQuery.on( 'row', function ( row ){
//       // console.log(row);
//       allTasks.push( row );
//       console.log("PG: ", allTasks);
//
//     });
//
//     taskQuery.on( 'end', function (){
//       console.log("PG CONNECT: ", allTasks);
//       return res.json( allTasks );
//     });
//   }); // End pg.connect function
//
// }); // End of app.get
// // --------------------------------------------------------

// Spinning up the server
app.listen(3000, function(){
  console.log('listening on server 3000');
});
