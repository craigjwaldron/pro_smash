console.log('hello from monday.js');

// Add controller to add Monday Task
myApp.controller('mondayAddController', [ '$scope', '$http', function ($scope, $http) {

    $scope.addTask = function (){
      console.log("button clicked");
      event.preventDefault();

    var newTask = {
      name: $scope.nameIn,
      completed: false,
      day_due: 1,
      week_due: 1
      };

      console.log(newTask);

    $http({
    method: 'POST',
    url:'/mondayTask',
    data: newTask
  }).then(function(){

  $scope.showMondayTasks();
    });
      $scope.nameIn ='';
  };
  // }]); // End of add controller

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
}]); // End of list controller
