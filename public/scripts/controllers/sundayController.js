


// Add controller
myApp.controller('sundayAddController', [ '$scope', '$http', '$rootScope','dayController',
 function ($scope, $http, $rootScope, dayController) {
  console.log(dayController);
  console.log("SUNDAY CHECK", $rootScope.count);


  $scope.totalValue=[];

    $scope.addSundayTask = function (){
      console.log("button clicked");

    $scope.newTask = {
        name: $scope.nameIn,
        completed: false,
        day_due: 0,
        week_due: 1,
        task_total_value: 1,
        sunday_total: 0,
      };

// Pushing to $scope.totalValue array and adding
$scope.totalValue.push($scope.newTask.task_total_value);
for(var i in $scope.totalValue) { $scope.newTask.sunday_total += $scope.totalValue[i]; }

console.log("Sunday total tasks", $scope.newTask.sunday_total);

    $http({
    method: 'POST',
    url:'sundayRoute/sundayTask',
    data: $scope.newTask
  }).then(function(){

    $scope.showSundayTasks();
    $scope.sundayCheckTask();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// SHOW TASKS -----------------------------------------------

// List controller to show sunday tasks

  $scope.showSundayTasks = function(){
    // event.preventDefault();

    console.log( 'in get SUNDAY' );
  $http({
  method: 'GET',
  url:'sundayRoute/getSundayTasks'
}).then(function( response ){
  $scope.sundayTasks = response.data;

    }); // End of then function
  }; // End of $scope.showSundayTasks

  $scope.showSundayTasks();

// COMPLETE TASK -----------------------------------------------

  $scope.completeSundayTask = function(taskID){
    // event.preventDefault();
        $scope.isActive = false;

        $scope.activeButton = function() {
            $scope.isActive = !$scope.isActive;
          };

     console.log('completeSundayTask.js');
     console.log('button cl');
    //  console.log("In da delete task: " + id);
     var sendID = {id: taskID};
     $http({
       method: 'POST',
       url: 'sundayRoute/completeSundayTask',
       data: sendID
     }).then(function(){
      //  $scope.showSundayTasks();
      //  $scope.sundayCheckTask();

     });
   }; // End completeSundayTask

  // DELETE TASK (OPTIONAL FEATURE) -----------------------------------------------

  //  $scope.deleteSundayTask = function(taskID){
  //    event.preventDefault();
   //
  //     console.log('deleteSundayTask.js');
  //    //  console.log("In da delete task: " + id);
   //
  //     var sendID = {id: taskID};
  //     $http({
   //
  //       method: 'DELETE',
  //       url: 'sundayRoute/deleteSundayTask',
  //       data: sendID,
  //       headers: {'Content-Type': 'application/json;charset=utf-8'}
   //
  //     }).then(function(){
   //
  //       $scope.showSundayTasks();
  //       // $scope.sundayCheckTask();
   //
  //     });
  //   };// End deleteSundayTask


// CHECK TASK COMPLETION -----------------------------------------------

            $scope.sundayCheckTask = function(){

                console.log("DUE", $scope.newTask.day_due);
                console.log("SUNDAY CHECK", $rootScope.count);

                /// scope
              if ($scope.newTask.day_due < $rootScope.count && $scope.newTask.completed === false ){

                $http({

                  method: 'POST',
                  url: 'sundayRoute/moveSundayTask',
                  data: $scope.newTask,

                }).then(function(){
                  $scope.showSundayTasks();

                }); // End then....
              } // end of if

              else {
                console.log("Task still has time");
              }

            }; // End completeSundayTask

    }]); // End of list controller
