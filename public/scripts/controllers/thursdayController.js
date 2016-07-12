console.log('hello from thursday.js');


// Add controller to add thursday task
myApp.controller('thursdayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addThursdayTask = function (){
      console.log("button clicked");

      // event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1,
      task_total_value: 1,
      thursday_total: 0
      };

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.thursday_total += $scope.totalValue[i]; }

console.log("Thursday total tasks", newTask.thursday_total);

    $http({
    method: 'POST',
    url:'thursdayRoute/thursdayTask',
    data: newTask
  }).then(function(){

    $scope.showThursdayTasks();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show thursday tasks

  $scope.showThursdayTasks = function(){
    // event.preventDefault();

    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'thursdayRoute/getThursdayTasks'
}).then(function( response ){
  $scope.thursdayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.thursdayTasks);
    }); // End of then function
  }; // End of $scope.showThursdayTasks

  $scope.showThursdayTasks();

  // -----------------------------------------------

  $scope.completeThursdayTask = function(taskID){
    // event.preventDefault();

     console.log('completeThursdayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: '/completeThursdayTask',
       data: sendID
     }).then(function(){
       $scope.showThursdayTasks();
     });
   };// End completeThursdayTask

   // -----------------------------------------------

   $scope.deleteThursdayTask = function(taskID){
     event.preventDefault();

      console.log('deleteThursdayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'thursdayRoute/deleteThursdayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showThursdayTasks();

      });
    };// End deleteThursdayTask

}]); // End of list controller
