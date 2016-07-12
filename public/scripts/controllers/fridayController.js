console.log('hello from friday.js');


// Add controller to add friday task
myApp.controller('fridayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addFridayTask = function (){
      console.log("button clicked");

      // event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1,
      task_total_value: 1,
      friday_total: 0
      };

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.friday_total += $scope.totalValue[i]; }

console.log("friday total tasks", newTask.friday_total);

    $http({
    method: 'POST',
    url:'fridayRoute/fridayTask',
    data: newTask
  }).then(function(){

    $scope.showFridayTasks();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show friday tasks

  $scope.showFridayTasks = function(){
    // event.preventDefault();

    console.log( 'in get friday' );
  $http({
  method: 'GET',
  url:'fridayRoute/getFridayTasks'
}).then(function( response ){
  $scope.fridayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.fridayTasks);
    }); // End of then function
  }; // End of $scope.showfridayTasks

  $scope.showFridayTasks();

  // -----------------------------------------------

  $scope.completeFridayTask = function(taskID){
    // event.preventDefault();

     console.log('completeFridayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: '/completeFridayTask',
       data: sendID
     }).then(function(){
       $scope.showFridayTasks();
     });
   };// End completefridayTask

   // -----------------------------------------------

   $scope.deletefridayTask = function(taskID){
     event.preventDefault();

      console.log('deleteFridayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'fridayRoute/deleteFridayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showFridayTasks();

      });
    };// End deletefridayTask

}]); // End of list controller
