console.log('hello from saturday.js');


// Add controller to add saturday task
myApp.controller('saturdayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addSaturdayTask = function (){
      console.log("button clicked");

      // event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1,
      task_total_value: 1,
      saturday_total: 0
      };

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.saturday_total += $scope.totalValue[i]; }

console.log("Saturday total tasks", newTask.saturday_total);

    $http({
    method: 'POST',
    url:'saturdayRoute/saturdayTask',
    data: newTask
  }).then(function(){

    $scope.showSaturdayTasks();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show saturday tasks

  $scope.showSaturdayTasks = function(){
    // event.preventDefault();

    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'saturdayRoute/getSaturdayTasks'
}).then(function( response ){
  $scope.saturdayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.saturdayTasks);
    }); // End of then function
  }; // End of $scope.showSaturdayTasks

  $scope.showSaturdayTasks();

  // -----------------------------------------------

  $scope.completeSaturdayTask = function(taskID){
    // event.preventDefault();

     console.log('completeSaturdayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: '/completeSaturdayTask',
       data: sendID
     }).then(function(){
       $scope.showSaturdayTasks();
     });
   };// End completeSaturdayTask

   // -----------------------------------------------

   $scope.deleteSaturdayTask = function(taskID){
     event.preventDefault();

      console.log('deleteSaturdayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'saturdayRoute/deleteSaturdayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showSaturdayTasks();

      });
    };// End deleteSaturdayTask

}]); // End of list controller
