// 
// // Add controller
// myApp.controller('sundayAddController', [ '$scope', '$http', '$rootScope','dayController',
//  function ($scope, $http, $rootScope, dayController) {
//
//   $scope.totalValue=[];
//   $rootScope.allSundayTasks=[];
//
//     $scope.addSundayTask = function (){
//       console.log("button clicked");
//
//     $scope.newTask = {
//         name: $scope.nameIn,
//         completed: false,
//         day_due: 2,
//         week_due: 1,
//         task_total_value: 1,
//         sunday_total: 0,
//       };
//
// $scope.allSundayTasks.push($scope.newTask);
// // Pushing to $scope.totalValue array and adding
// $scope.totalValue.push($scope.newTask.task_total_value);
// for(var i in $scope.totalValue) { $scope.newTask.sunday_total += $scope.totalValue[i]; }
//
// console.log("Sunday total tasks", $scope.newTask.sunday_total);
// console.log("All tasks are: ", $rootScope.allSundayTasks);
//
//     $http({
//     method: 'POST',
//     url:'sundayRoute/sundayTask',
//     data: $scope.newTask
//   }).then(function(){
//
//     $scope.showSundayTasks();
//     // $scope.sundayCheckTask();
//
//     });
//       $scope.nameIn =''; // Reset input
//   };
//   // }]); // End of add controller
//
// // SHOW TASKS -----------------------------------------------
//
// // List controller to show sunday tasks
//
//   $scope.showSundayTasks = function(){
//     // event.preventDefault();
//
//     console.log( 'in get SUNDAY' );
//   $http({
//   method: 'GET',
//   url:'sundayRoute/getSundayTasks'
// }).then(function( response ){
//   $scope.sundayTasks = response.data;
//
//     }); // End of then function
//   }; // End of $scope.showSundayTasks
//
//   $scope.showSundayTasks();
//
// // COMPLETE TASK -----------------------------------------------
//
//   $scope.completeSundayTask = function(taskID){
//     // event.preventDefault();
//         $scope.isActive = false;
//
//         $scope.activeButton = function() {
//             $scope.isActive = !$scope.isActive;
//           };
//
//      console.log('completed a Sunday task');
//     //  console.log("In da delete task: " + id);
//      var sendID = {id: taskID};
//      $http({
//        method: 'POST',
//        url: 'sundayRoute/completeSundayTask',
//        data: sendID
//      }).then(function(){
//       //  $scope.showSundayTasks();
//       //  $scope.sundayCheckTask();
//
//      });
//    }; // End completeSundayTask
//
//   // DELETE TASK (OPTIONAL FEATURE) -----------------------------------------------
//
//   //  $scope.deleteSundayTask = function(taskID){
//   //    event.preventDefault();
//    //
//   //     console.log('deleteSundayTask.js');
//   //    //  console.log("In da delete task: " + id);
//    //
//   //     var sendID = {id: taskID};
//   //     $http({
//    //
//   //       method: 'DELETE',
//   //       url: 'sundayRoute/deleteSundayTask',
//   //       data: sendID,
//   //       headers: {'Content-Type': 'application/json;charset=utf-8'}
//    //
//   //     }).then(function(){
//    //
//   //       $scope.showSundayTasks();
//   //       // $scope.sundayCheckTask();
//    //
//   //     });
//   //   };// End deleteSundayTask
//
//
//   // CHECK TASK COMPLETION -----------------------------------------------
//
//         $scope.sundayCheckTask = function(){
//             // console.log("DUE", $scope.newTask.day_due);
//             console.log("All tasks are: ", $rootScope.allSundayTasks);
//
//             console.log("Current Day is: ", $rootScope.count);
//             console.log("NEW", $scope.newTask);
//             console.log("NEW 2", $scope.sundayTasks);
//             console.log("DAy due: ", $rootScope.allSundayTasks.day_due);
//
//             for (var i = 0; i < $rootScope.allSundayTasks.length; i++) {
//       // var moveTask =  $scope.sundayTasks[i];
//
//               if ($rootScope.allSundayTasks.day_due < $rootScope.count && $rootScope.allSundayTasks === false ){
//
//               }
//             }
//
//             $http({
//
//               method: 'POST',
//               url: 'sundayRoute/moveSundayTask',
//               data: $scope.newTask,
//
//             }).then(function(){
//
//               console.log("SEE YA TASK!");
//
//               // $scope.showSundayTasks();
//
//             }); // End then....
//            // end of if
//
//           // else {
//           //
//           //   console.log("Task still has time");
//           //
//           // }
//
//         }; // End completeSundayTask
//
//     }]); // End of list controller



// // CHECK TASK COMPLETION -----------------------------------------------
//
//       $scope.sundayCheckTask = function(){
//
//           // console.log("DUE", $scope.newTask.day_due);
//           console.log("SUNDAY CHECK", $rootScope.count);
//           console.log("NEW", $scope.newTask);
//           console.log("NEW 2", $scope.sundayTasks);
//
//
//           /// scope
// //---------checking single task ----------
//
//         if ($scope.newTask.day_due < $rootScope.count && $scope.newTask.completed === false ){
//
// // ----------checking array of tasks -------
//
//           $http({
//
//             method: 'POST',
//             url: 'sundayRoute/moveSundayTask',
//             data: $scope.newTask,
//
//           }).then(function(){
//
//             $scope.showSundayTasks();
//
//           }); // End then....
//         } // end of if
//
//         else {
//
//           console.log("Task still has time");
//
//         }
//
//       }; // End completeSundayTask
//
//   }]); // End of list controller
