var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: '/views/login.html',
			controller: "LoginController"
		})
		.when('/register', {
			templateUrl: '/views/register.html',
			controller: "LoginController"
		})
		.when('/home', {
			templateUrl: '/views/home.html',
			controller: "HomeController"
		})
		.when('/other', {
			templateUrl: '/views/other.html',
			controller: "OtherController"
		})
		.otherwise({
			redirectTo: 'login'
		});
}]);


// Add controller
myApp.controller('mainController', [ '$scope', '$http', '$rootScope',
 function ($scope, $http, $rootScope) {


  $scope.totalValue=[];
  $rootScope.allSundayTasks=[];

    $scope.addSundayTask = function (){
      console.log("button clicked");

    $scope.newSundayTask = {
        name: $scope.nameIn,
        completed: false,
        day_due: 0,
        week_due: 1,
        task_total_value: 1,
        sunday_total: 0,
      };

$rootScope.allSundayTasks.push($scope.newSundayTask);
// Pushing to $scope.totalValue array and adding
$scope.totalValue.push($scope.newSundayTask.task_total_value);
for(var i in $scope.totalValue) { $scope.newSundayTask.sunday_total += $scope.totalValue[i]; }

console.log("Sunday total tasks", $scope.newSundayTask.sunday_total);
console.log("All tasks are: ", $rootScope.allSundayTasks);

    $http({
    method: 'POST',
    url:'sundayRoute/sundayTask',
    data: $scope.newSundayTask
  }).then(function(){

    $scope.showSundayTasks();
    // $scope.sundayCheckTask();

    });
      $scope.nameIn =''; // Reset input
  };

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
		console.log("All SUNDAY tasks are: ", $scope.allSundayTasks);

        $scope.isActive = false;

        $scope.activeButton = function() {
            $scope.isActive = !$scope.isActive;
          };

     console.log('completed a Sunday task');
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



  // CHECK TASK COMPLETION -----------------------------------------------

    $scope.sundayCheckTask = function(){
        // console.log("DUE", $scope.newTask.day_due);
        console.log("All tasks are: ", $rootScope.allSundayTasks);

        console.log("DAY BE: ", $rootScope.count);
				console.log("SUNDAY BE: ", $rootScope.allSundayTasks);
        console.log("MONDAY BE", $rootScope.allMondayTasks);

        for (var i = 0; i < $rootScope.allSundayTasks.length; i++) {
  			var moveTask =  $scope.allSundayTasks[i].row.day_due;
console.log("MOVE TASK", moveTask);
          if ($rootScope.allSundayTasks.day_due < $rootScope.count && $rootScope.allSundayTasks === false ){

          }
        }

        $http({

          method: 'POST',
          url: 'sundayRoute/moveSundayTask',
          data: $scope.newTask,

        }).then(function(){

          console.log("SEE YA TASK!");

          // $scope.showSundayTasks();

        }); // End then....
       // end of if

      // else {
      //
      //   console.log("Task still has time");
      //
      // }

    }; // End completeSundayTask




//------------------------------MONDAY--------------------------------

// Add controller
// myApp.controller('mondayAddController', [ '$scope', '$http', '$rootScope',
//  function ($scope, $http, $rootScope) {
console.log("All SUNDAY tasks are: ", $scope.allSundayTasks);

  $scope.totalValue=[];
  $rootScope.allMondayTasks=[];

    $scope.addMondayTask = function (){
      // console.log("button clicked");

    $scope.newTask = {
        name: $scope.nameIn,
        completed: false,
        day_due: 1,
        week_due: 1,
        task_total_value: 1,
        sunday_total: 0,
      };

console.log("All SUNDAY SCOPE tasks are: ", $scope.allSundayTasks);
console.log("All SUNDAY ROOT tasks are: ", $rootScope.allSundayTasks);

$rootScope.allMondayTasks.push($scope.newTask);
// Pushing to $scope.totalValue array and adding
$scope.totalValue.push($scope.newTask.task_total_value);
for(var i in $scope.totalValue) { $scope.newTask.monday_total += $scope.totalValue[i]; }

console.log("Monday total tasks", $scope.newTask.monday_total);
console.log("All tasks are: ", $scope.allMondayTasks);

    $http({
    method: 'POST',
    url:'sundayRoute/mondayTask',
    data: $scope.newTask
  }).then(function(){

    $scope.showMondayTasks();
    // $scope.sundayCheckTask();

    });
      $scope.nameIn =''; // Reset input
  };
  // }]); // End of add controller

// SHOW TASKS -----------------------------------------------

// List controller to show sunday tasks

  $scope.showMondayTasks = function(){
    // event.preventDefault();

    console.log( 'in get MONDAY' );
  $http({
  method: 'GET',
  url:'sundayRoute/getMondayTasks'
}).then(function( response ){
  $scope.mondayTasks = response.data;

    }); // End of then function
  }; // End of $scope.showSundayTasks

  $scope.showMondayTasks();

// COMPLETE TASK -----------------------------------------------

  $scope.completeMondayTask = function(taskID){
    // event.preventDefault();
		console.log("All SUNDAY tasks are: ", $scope.allSundayTasks);

        $scope.isActive = false;

        $scope.activeButton = function() {
            $scope.isActive = !$scope.isActive;
          };

     console.log('completed a Monday task');
    //  console.log("In da delete task: " + id);
     var sendID = {id: taskID};
     $http({
       method: 'POST',
       url: 'sundayRoute/completeMondayTask',
       data: sendID
     }).then(function(){
      //  $scope.showSundayTasks();
      //  $scope.sundayCheckTask();

     });
   }; // End completeSundayTask



//-----------------------TUESDAY-------------------------------


		  $scope.totalValue=[];
		  $rootScope.allTuesdayTasks=[];

		    $scope.addTuesdayTask = function (){
		      console.log("button clicked");

		    $scope.newTask = {
		        name: $scope.nameIn,
		        completed: false,
		        day_due: 2,
		        week_due: 1,
		        task_total_value: 1,
		        sunday_total: 0,
		      };

		$scope.allTuesdayTasks.push($scope.newTask);
		// Pushing to $scope.totalValue array and adding
		$scope.totalValue.push($scope.newTask.task_total_value);
		for(var i in $scope.totalValue) { $scope.newTask.tuesday_total += $scope.totalValue[i]; }

		console.log("Tuesday total tasks", $scope.newTask.tuesday_total);
		console.log("All tasks are: ", $rootScope.allTuesdayTasks);

		    $http({
		    method: 'POST',
		    url:'tuesdayRoute/tuesdayTask',
		    data: $scope.newTask
		  }).then(function(){

		    $scope.showTuesdayTasks();
		    // $scope.sundayCheckTask();

		    });
		      $scope.nameIn =''; // Reset input
		  };

		// SHOW TASKS -----------------------------------------------

		// List controller to show sunday tasks

		  $scope.showTuesdayTasks = function(){
		    // event.preventDefault();

		    console.log( 'in get Tuesday' );
		  $http({
		  method: 'GET',
		  url:'tuesdayRoute/getTuesdayTasks'
		}).then(function( response ){
		  $scope.tuesdayTasks = response.data;

		    }); // End of then function
		  }; // End of $scope.showSundayTasks

		  $scope.showTuesdayTasks();

	// COMPLETE TASK -----------------------------------------------

	  $scope.completeTuesdayTask = function(taskID){
	    // event.preventDefault();
	        $scope.isActive = false;

	        $scope.activeButton = function() {
	            $scope.isActive = !$scope.isActive;
	          };

	     console.log('completed a Tuesday task');
	    //  console.log("In da delete task: " + id);
	     var sendID = {id: taskID};
	     $http({
	       method: 'POST',
	       url: 'tuesdayRoute/completeTuesdayTask',
	       data: sendID
	     }).then(function(){
	      //  $scope.showSundayTasks();
	      //  $scope.sundayCheckTask();

	     });
	   }; // End completeSundayTask




	//-----------------------WEDNESDAY-------------------------------


			  $scope.totalValue=[];
			  $rootScope.allWednesdayTasks=[];

			    $scope.addWednesdayTask = function (){
			      console.log("button clicked");

			    $scope.newTask = {
			        name: $scope.nameIn,
			        completed: false,
			        day_due: 3,
			        week_due: 1,
			        task_total_value: 1,
			        sunday_total: 0,
			      };

			$rootScope.allWednesdayTasks.push($scope.newTask);
			// Pushing to $scope.totalValue array and adding
			$scope.totalValue.push($scope.newTask.task_total_value);
			for(var i in $scope.totalValue) { $scope.newTask.wednesday_total += $scope.totalValue[i]; }

			console.log("Wednesday total tasks", $scope.newTask.wednesday_total);
			console.log("All WEDNSDAY tasks are: ", $rootScope.allWednesdayTasks);

			    $http({
			    method: 'POST',
			    url:'wednesdayRoute/wednesdayTask',
			    data: $scope.newTask
			  }).then(function(){

			    $scope.showWednesdayTasks();
			    // $scope.sundayCheckTask();

			    });
			      $scope.nameIn =''; // Reset input
			  };
			  // }]); // End of add controller

			// SHOW TASKS -----------------------------------------------

			// List controller to show sunday tasks

			  $scope.showWednesdayTasks = function(){
			    // event.preventDefault();

			    console.log( 'in get Wednesday' );
			  $http({
			  method: 'GET',
			  url:'wednesdayRoute/getWednesdayTasks'
			}).then(function( response ){
			  $scope.wednesdayTasks = response.data;

			    }); // End of then function
			  }; // End of $scope.showSundayTasks

			  $scope.showWednesdayTasks();

		// COMPLETE TASK -----------------------------------------------

		  $scope.completeWednesdayTask = function(taskID){
		    // event.preventDefault();
		        $scope.isActive = false;

		        $scope.activeButton = function() {
		            $scope.isActive = !$scope.isActive;
		          };

		     console.log('completed a Wednesday task');
		    //  console.log("In da delete task: " + id);
		     var sendID = {id: taskID};
		     $http({
		       method: 'POST',
		       url: 'wednesdayRoute/completeWednesdayTask',
		       data: sendID
		     }).then(function(){
		      //  $scope.showSundayTasks();
		      //  $scope.sundayCheckTask();

		     });
		   }; // End completeSundayTask

			 //-----------------------THURSDAY-------------------------------


			 			$scope.totalValue=[];
			 			$rootScope.allThursdayTasks=[];

			 				$scope.addThursdayTask = function (){
			 					console.log("button clicked");

			 				$scope.newTask = {
			 						name: $scope.nameIn,
			 						completed: false,
			 						day_due: 4,
			 						week_due: 1,
			 						task_total_value: 1,
			 						sunday_total: 0,
			 					};

			 		$rootScope.allThursdayTasks.push($scope.newTask);
			 		// Pushing to $scope.totalValue array and adding
			 		$scope.totalValue.push($scope.newTask.task_total_value);
			 		for(var i in $scope.totalValue) { $scope.newTask.thursday_total += $scope.totalValue[i]; }

			 		console.log("Thursday total tasks", $scope.newTask.thursday_total);
			 		console.log("All Thursday tasks are: ", $rootScope.allThursdayTasks);

			 				$http({
			 				method: 'POST',
			 				url:'thursdayRoute/thursdayTask',
			 				data: $scope.newTask
			 			}).then(function(){

			 				$scope.showThursdayTasks();
			 				// $scope.sundayCheckTask();

			 				});
			 					$scope.nameIn =''; // Reset input
			 			};
			 			// }]); // End of add controller

			 		// SHOW TASKS -----------------------------------------------

			 		// List controller to show sunday tasks

			 			$scope.showThursdayTasks = function(){
			 				// event.preventDefault();

			 				console.log( 'in get Thursday' );
			 			$http({
			 			method: 'GET',
			 			url:'thursdayRoute/getThursdayTasks'
			 		}).then(function( response ){
			 			$scope.thursdayTasks = response.data;

			 				}); // End of then function
			 			}; // End of $scope.showSundayTasks

			 			$scope.showThursdayTasks();

			 	// COMPLETE TASK -----------------------------------------------

			 		$scope.completeThursdayTask = function(taskID){
			 			// event.preventDefault();
			 					$scope.isActive = false;

			 					$scope.activeButton = function() {
			 							$scope.isActive = !$scope.isActive;
			 						};

			 			 console.log('completed a Thursday task');
			 			//  console.log("In da delete task: " + id);
			 			 var sendID = {id: taskID};
			 			 $http({
			 				 method: 'POST',
			 				 url: 'thursdayRoute/completeThursdayTask',
			 				 data: sendID
			 			 }).then(function(){
			 				//  $scope.showSundayTasks();
			 				//  $scope.sundayCheckTask();

			 			 });
			 		 }; // End completeSundayTask


		}]); // End of list controller
