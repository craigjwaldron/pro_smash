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
      value: 1,
      sunday_total: 0
      };

$scope.totalValue.push(newTask.value);
console.log("VALUEEEEE", newTask.value);

for(var i in $scope.totalValue) { newTask.sunday_total += $scope.totalValue[i]; }

console.log("TOOOOTASLLL", newTask.sunday_total);
console.log("VLSKJLKDSJ", $scope.totalValue);

    $http({
    method: 'POST',
    url:'/sundayTask',
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
    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'/getSundayTasks'
}).then(function( response ){
  $scope.sundayTasks = response.data;
  // console.log("Get the $scope", response.data);
  console.log($scope.sundayTasks);
    }); // End of then function
  }; // End of $scope.showSundayTasks

  $scope.showSundayTasks();

  // -----------------------------------------------

  $scope.completeSundayTask = function(taskID){

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

      console.log('deleteSundayTask.js');
     //  console.log("In da delete task: " + id);

      var sendID = {id: taskID};
      $http({
        method: 'DELETE',
        url: '/deleteSundayTask',
        data: sendID,
        headers: {'Content-Type': 'application/json;charset=utf-8'}

      }).then(function(){
        $scope.showSundayTasks();
      });
    };// End deleteSundayTask

}]); // End of list controller
