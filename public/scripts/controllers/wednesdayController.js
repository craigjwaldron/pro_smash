// console.log('hello from wednesday.js');


// Add controller to add wednesday task
myApp.controller('wednesdayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addWednesdayTask = function (){
      console.log("button clicked");

      // event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1,
      task_total_value: 1,
      wednesday_total: 0
      };

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.wednesday_total += $scope.totalValue[i]; }

console.log("Wednesday total tasks", newTask.wednesday_total);

    $http({
    method: 'POST',
    url:'wednesdayRoute/wednesdayTask',
    data: newTask
  }).then(function(){

    $scope.showWednesdayTasks();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show wednesday tasks

  $scope.showWednesdayTasks = function(){
    // event.preventDefault();

    // console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'wednesdayRoute/getWednesdayTasks'
}).then(function( response ){
  $scope.wednesdayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.wednesdayTasks);
    }); // End of then function
  }; // End of $scope.showWednesdayTasks

  $scope.showWednesdayTasks();

  // -----------------------------------------------

  $scope.completeWednesdayTask = function(taskID){
    // event.preventDefault();

     console.log('completeWednesdayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: 'wednesdayRoute/completeWednesdayTask',
       data: sendID
     }).then(function(){
       $scope.showWednesdayTasks();
     });
   };// End completeWednesdayTask

   // -----------------------------------------------

   $scope.deleteWednesdayTask = function(taskID){
     event.preventDefault();

      console.log('deleteWednesdayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'wednesdayRoute/deleteWednesdayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showWednesdayTasks();

      });
    };// End deleteWednesdayTask

}]); // End of list controller
