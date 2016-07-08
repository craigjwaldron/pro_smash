// console.log('hello from script.js');
//
//
var myApp=angular.module( 'myApp', [] );
//
//
// // ---------------------------------------------------------------------------------
//
// // Add controller to add new pet
// myApp.controller('sundayAddController', [ '$scope', '$http', function ($scope, $http) {
//
//     $scope.addTask = function (){
//       console.log("button clicked");
//       event.preventDefault();
//
//     var newTask = {
//       name: $scope.nameIn,
//       completed: false,
//       day_due: 0,
//       week_due: 1
//       };
//
//       console.log(newTask);
//
//     $http({
//     method: 'POST',
//     url:'/sundayTask',
//     data: newTask
//   }).then(function(){
//
//   $scope.showSundayTasks();
// });
//       $scope.nameIn ='';
//     };
//   // }]); // End of add controller
//
//   // ---------------------------------------------------------------------------------
// // List controller to view list
// // myApp.controller('sundayGetController', [ '$scope', '$http', function ($scope, $http) {
//
//   $scope.allTasks = [];
//
//   $scope.showSundayTasks = function(){
//     console.log( 'in get SUNDAY' );
//   $http({
//   method: 'GET',
//   url:'/getSundayTasks'
// }).then(function( response ){
//   $scope.sundayTasks = response.data;
//   // console.log("Get the $scope", response.data);
//   console.log($scope.sundayTasks);
//     }); // End of then function
//   }; // End of $scope.showSundayTasks
//
//   $scope.showSundayTasks();
// }]); // End of list controller
