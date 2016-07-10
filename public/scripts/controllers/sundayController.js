console.log('hello from sunday.js');

// Add controller to add sunday task
myApp.controller('sundayAddController', [ '$scope', '$http', function ($scope, $http) {

  console.log('hello from sunday.js');

    $scope.addSundayTask = function (){
      console.log("button clicked");
      event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 0,
      week_due: 1
      };

      console.log(newTask);

    $http({
    method: 'POST',
    url:'/sundayTask',
    data: newTask
  }).then(function(){

  $scope.showSundayTasks();
});
      $scope.nameIn ='';
    };
  // }]); // End of add controller

// -----------------------------------------------
// List controller to show sunday tasks

  $scope.allTasks = [];

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
   };//end deleteHero

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
    };//end deleteHero

}]); // End of list controller
