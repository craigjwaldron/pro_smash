var path = require('path');
var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();
var connectionString = "postgres://localhost:5432/pro_smash_tasks";

// CREATE Task POST -------------------------------------------------------------------------------------------------------
router.post ( "/sundayTask", function ( req, res ){
  console.log( "hit createTask" );

// Send new task to data base
  pg.connect( connectionString, function( err, client, done ){
    var query =  client.query ( "INSERT INTO sunday_table ( task_name, completed, day_due, week_due, task_total_value, sunday_total ) VALUES ( $1, $2, $3, $4, $5, $6 )", [ req.body.name, req.body.completed, req.body.day_due, req.body.week_due, req.body.task_total_value, req.body.sunday_total ] );
      done();
      query.on('end', function(){

        // console.log(req.body.name);

        console.log("POST END");

      return res.end();
    }); // End query.on
  }); // End of pg
}); // End of post

// --------------------------------------------------------

// COMPLETE Task
// Send new task to data base
router.put ( '/completeSundayTask', function ( req, res ){
  console.log("TASK SMASHEDDDDD!!!!!!");
  pg.connect( connectionString, function( err, client, done ){
    // console.log("Hello" + id);
    // console.log("Hello" + task.id);
    // console.log(req.body);

    var query =  client.query ( 'UPDATE sunday_table SET completed=true where id=' + req.body.id + ';' );
  done();
    res.end();
  }); // End of pg
}); // End of post

// --------------------------------------------------------

// DELETE Task
router.delete ( '/deleteSundayTask', function ( req, res ){
  console.log("TASK DELETED");
  pg.connect( connectionString, function( err, client, done ){
    // console.log("Hello" + id);
    // console.log("Hello" + task.id);
    // console.log(req.body);

    client.query ( 'DELETE from sunday_table WHERE id=' +req.body.id+ ';' );
  done();
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    res.end();

  }); // End of pg
}); // End of post

// --------------------------------------------------------

// App.get to display on DOM
router.get('/getSundayTasks', function( req, res){
  console.log( "Hello from getTask app.get" );

  pg.connect ( connectionString, function ( err, client, done ){
    console.log("in DB");
    var allTasks = [];

    var taskQuery = client.query ( "SELECT * FROM sunday_table");
      done();
    var rows = 0;

    taskQuery.on( 'row', function ( row ){
      // console.log(row);
      allTasks.push( row );
      // console.log("PG: ", allTasks);

    });

    taskQuery.on( 'end', function (){
      // console.log("PG CONNECT: ", allTasks);
      return res.json( allTasks );
    });
  }); // End pg.connect function

}); // End of app.get


// --------------------------------------------------------

// Send new task to data base
router.post ( '/moveSundayTask', function ( req, res ){
  console.log("CHECKED BRO");
  console.log("TASK TO BE MOVED", req.body.name);

  // pg.connect( connectionString, function( err, client, done ){

  //   var query =  client.query ( 'INSERT INTO monday_table (id) SELECT id=' +req.body.id+ '; FROM sunday_table' );
  // done();
  //   res.end();
  // }); // End of pg

/////// TESTEROONIE
  pg.connect( connectionString, function( err, client, done ){
    console.log("TASK TO BE MOVED", req.body.name);

  // var query =  client.query ( 'SELECT * FROM sunday_table' );
  // done();
  //   console.log( query );
  //   res.end();
  // }); // End of pg

  var query = client.query( 'SELECT * FROM sunday_table' );
    console.log( " -------------------- query: ", query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      if( row.task_name == req.body.name ){
        console.log( 'found the dork named', row.task_name, ' id:', row.id );
        // row is the reorcd
        client.query ( "INSERT INTO monday_table ( task_name, completed, day_due, week_due, task_total_value, monday_total ) VALUES ( $1, $2, $3, $4, $5, $6 )", [ row.task_name, row.completed, 2, row.week_due, row.task_total_value, row.sunday_total ] );
        client.query ( 'DELETE from sunday_table WHERE id=' +row.id+ ';' );

      }
      // results.push( row );
    }); // end query push
    query.on( 'end', function (){

      res.send();
    });
});

}); // End of post

module.exports = router;
