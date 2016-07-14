// console.log('hello from monday.js');


// Add controller to add sunday task
myApp.controller('mondayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addMondayTask = function (){
      console.log("button clicked");

    var newTask = {
        name: $scope.nameIn,
        completed: false,
        day_due: 1,
        week_due: 1,
        task_total_value: 1,
        monday_total: 0
      };

// $scope.totalValue.push(newTask);
// console.log(newTask);

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.monday_total += $scope.totalValue[i]; }

// console.log("Monday total tasks", newTask.monday_total);

    $http({
    method: 'POST',
    url:'mondayRoute/mondayTask',
    data: newTask
  }).then(function(){

    $scope.showMondayTasks();

    });
      $scope.nameIn =''; // Reset input
  }; // End of add controller

// -----------------------------------------------
// List controller to show sunday tasks

  $scope.showMondayTasks = function(){
    // event.preventDefault();

    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'mondayRoute/getMondayTasks'
}).then(function( response ){
  $scope.mondayTasks = response.data;
  // console.log("Get the $scope", response.data);
  // console.log($scope.mondayTasks);
    }); // End of then function
  }; // End of $scope.showSundayTasks

  $scope.showMondayTasks();

  // -----------------------------------------------

  $scope.completeMondayTask = function(taskID){
    // event.preventDefault();

     console.log('completeMondayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: '/completeMondayTask',
       data: sendID
     }).then(function(){
       $scope.showMondayTasks();
     });
   };// End completeSundayTask

   // -----------------------------------------------

   $scope.deleteMondayTask = function(taskID){
     event.preventDefault();

    //  for(var i in $scope.totalValue) { newTask.monday_total -= $scope.totalValue[i]; }

     console.log("Monday total tasks AFTER DELETE", $scope.totalValue);

      console.log('deleteMondayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'mondayRoute/deleteMondayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showMondayTasks();

      });
    };// End deleteSundayTask

}]); // End of controller
