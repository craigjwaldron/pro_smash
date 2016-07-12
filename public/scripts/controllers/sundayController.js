console.log('hello from sunday.js');


// Add controller to add sunday task
myApp.controller('sundayAddController', [ '$scope', '$http', function ($scope, $http) {

  $scope.totalValue=[];

    $scope.addSundayTask = function (){
      console.log("button clicked");

      // event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1,
      task_total_value: 1,
      sunday_total: 0
      };

$scope.totalValue.push(newTask.task_total_value);
console.log("VALUEEEEE", newTask.task_total_value);

for(var i in $scope.totalValue) { newTask.sunday_total += $scope.totalValue[i]; }

console.log("TOOOOTASLLL", newTask.sunday_total);
console.log("VLSKJLKDSJ", $scope.totalValue);

    $http({
    method: 'POST',
    url:'sundayRoute/sundayTask',
    data: newTask
  }).then(function(){

    $scope.showSundayTasks();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show sunday tasks

  $scope.showSundayTasks = function(){
    // event.preventDefault();

    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'sundayRoute/getSundayTasks'
}).then(function( response ){
  $scope.sundayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.sundayTasks);
    }); // End of then function
  }; // End of $scope.showSundayTasks

  $scope.showSundayTasks();

  // -----------------------------------------------

  $scope.completeSundayTask = function(taskID){
    // event.preventDefault();

     console.log('completeSundayTask.js');
    //  console.log("In da delete task: " + id);

     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: '/completeSundayTask',
       data: sendID
     }).then(function(){
       $scope.showSundayTasks();
     });
   };// End completeSundayTask

   // -----------------------------------------------

   $scope.deleteSundayTask = function(taskID){
     event.preventDefault();

      console.log('deleteSundayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: 'sundayRoute/deleteSundayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showSundayTasks();

      });
    };// End deleteSundayTask

}]); // End of list controller
