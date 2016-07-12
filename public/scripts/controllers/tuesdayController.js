console.log('hello from tuesday.js');


// Add controller to add tuesday task
myApp.controller('tuesdayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addTuesdayTask = function (){
      console.log("button clicked");

      // event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1,
      task_total_value: 1,
      tuesday_total: 0
      };

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.tuesday_total += $scope.totalValue[i]; }

console.log("Tuesday total tasks", newTask.tuesday_total);

    $http({
    method: 'POST',
    url:'tuesdayRoute/tuesdayTask',
    data: newTask
  }).then(function(){

    $scope.showTuesdayTasks();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show tuesday tasks

  $scope.showTuesdayTasks = function(){
    // event.preventDefault();

    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'tuesdayRoute/getTuesdayTasks'
}).then(function( response ){
  $scope.tuesdayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.tuesdayTasks);
    }); // End of then function
  }; // End of $scope.showTuesdayTasks

  $scope.showTuesdayTasks();

  // -----------------------------------------------

  $scope.completeTuesdayTask = function(taskID){
    // event.preventDefault();

     console.log('completeTuesdayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: '/completeTuesdayTask',
       data: sendID
     }).then(function(){
       $scope.showTuesdayTasks();
     });
   };// End completeTuesdayTask

   // -----------------------------------------------

   $scope.deleteTuesdayTask = function(taskID){
     event.preventDefault();

      console.log('deleteTuesdayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'tuesdayRoute/deleteTuesdayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showTuesdayTasks();

      });
    };// End deleteTuesdayTask

}]); // End of list controller
