console.log('hello from script.js');

var myApp=angular.module( 'myApp', [] );

// ---------------------------------------------------------------------------------

// Add controller to add new pet
myApp.controller('addController', [ '$scope', '$http', function ($scope, $http) {

    $scope.addPet = function (){
      console.log("button clicked");
      event.preventDefault();

    var newTask = {
      name: $scope.nameIn
      };

      console.log(newTask);

    $http({
    method: 'POST',
    url:'/addSundayTask',
    data: newTask
      });
      $scope.nameIn ='';
    };
  }]); // End of add controller
