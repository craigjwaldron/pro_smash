var path = require('path');
var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();
var connectionString = "postgres://localhost:5432/pro_smash_tasks";

// CREATE Task POST -------------------------------------------------------------------------------------------------------
router.post ( "/thursdayTask", function ( req, res ){
  console.log( "hit createTask" );
// Send new task to data base
  pg.connect( connectionString, function( err, client, done ){
    var query =  client.query ( "INSERT INTO thursday_table ( task_name, completed, day_due, week_due, task_total_value, thursday_total ) VALUES ( $1, $2, $3, $4, $5, $6 )", [ req.body.name, req.body.completed, req.body.day_due, req.body.week_due, req.body.task_total_value, req.body.thursday_total ] );
      done();
      query.on('end', function(){

        console.log(req.body.name);

        console.log("POST END");

      return res.end();
    }); // End query.on
  }); // End of pg
}); // End of post

// --------------------------------------------------------

// COMPLETE Task
// Send new task to data base
router.post ( '/completeThursdayTask', function ( req, res ){
  console.log("TASK SMASHEDDDDD!!!!");
  pg.connect( connectionString, function( err, client, done ){
    // console.log("Hello" + id);
    // console.log("Hello" + task.id);
    console.log(req.body);

    var query =  client.query ( 'UPDATE thursday_table SET completed=true where id=' + req.body.id + ';' );
  done();
    res.end();
  }); // End of pg
}); // End of post

// --------------------------------------------------------

// DELETE Task
// Send new task to data base
router.delete ( '/deleteThursdayTask', function ( req, res ){
  console.log("TASK DELETED");
  pg.connect( connectionString, function( err, client, done ){
    // console.log("Hello" + id);
    // console.log("Hello" + task.id);
    console.log(req.body);

    client.query ( 'DELETE from thursday_table WHERE id=' +req.body.id+ ';' );
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
router.get('/getThursdayTasks', function( req, res){
  console.log( "Hello from getTask app.get" );

  pg.connect ( connectionString, function ( err, client, done ){
    console.log("in DB");
    var allTasks = [];

    var taskQuery = client.query ( "SELECT * FROM thursday_table");
      done();
    var rows = 0;

    taskQuery.on( 'row', function ( row ){
      // console.log(row);
      allTasks.push( row );
      console.log("PG: ", allTasks);

    });

    taskQuery.on( 'end', function (){
      console.log("PG CONNECT: ", allTasks);
      return res.json( allTasks );
    });
  }); // End pg.connect function

}); // End of app.get

module.exports = router;
