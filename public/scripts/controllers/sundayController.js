
// Add controller to add sunday task
myApp.controller('sundayAddController', [ '$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

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
  // console.log("resp", response.data[0].id);
  // console.log("ID", $scope.sundayTasks[4].id);


    }); // End of then function
  }; // End of $scope.showSundayTasks

  $scope.showSundayTasks();

  // -----------------------------------------------

  $scope.completeSundayTask = function(taskID){
    // event.preventDefault();

     console.log('completeSundayTask.js');
     console.log('button cl');
    //  console.log("In da delete task: " + id);
     var sendID = {id: taskID};
     $http({
       method: 'PUT',
       url: 'sundayRoute/completeSundayTask',
       data: sendID
     }).then(function(){
       $scope.showSundayTasks();
       $scope.sundayCheckTask();

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
        // $scope.sundayCheckTask();

      });
    };// End deleteSundayTask

    // -----------------------------------------------

      $scope.sundayCheckTask = function(){

          // console.log("Da Tasks", $scope.sundayTasks);
          // console.log("DUE", $scope.newTask.day_due);
          console.log("SUNDAY CHECK", $rootScope.count);
          // console.log("COMPLETED?", $scope.newTask.completed);
          // console.log("ID?", $scope.sundayTasks[4].id);

          /// scope
        if ($scope.newTask.day_due < $rootScope.count && $scope.newTask.completed === false ){

            // for (var i = 0; i <$scope.sundayTasks.length; i++) {
            //   $scope.sundayTasks[i].id;
            // }

          $http({

            method: 'POST',
            url: 'sundayRoute/moveSundayTask',
            data: $scope.newTask,

          }).then(function(){
            $scope.showSundayTasks();
            $scope.showMondayTasks();

          }); // End then....
        } // end of if
        else {
          console.log("HI MOM");
        }
      }; // End completeSundayTask

    }]); // End of list controller
