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

$rootScope.totalSmashes = 0;
$rootScope.totalTasks = 0;


	 //------------------------------SUNDAY--------------------------------


 	  $rootScope.sundayTotalValue=[];
 	  $rootScope.allSundayTasks=[];

 	    $scope.addSundayTask = function (){
 	      // console.log("button clicked");
				$rootScope.totalTasks++;

 	    $scope.newSundayTask = {
 	        name: $scope.nameIn,
 	        completed: false,
 	        day_due: 1,
 	        week_due: 1,
 	        task_total_value: 1,
 	        sunday_total: 0,
 	      };

 	$rootScope.allSundayTasks.push($scope.newSundayTask);
 	// Pushing to $scope.totalValue array and adding
 	$rootScope.sundayTotalValue.push($scope.newSundayTask.task_total_value);
 	for(var i in $rootScope.sundayTotalValue) { $scope.newSundayTask.sunday_total += $rootScope.sundayTotalValue[i]; }

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
			$rootScope.totalSmashes ++;

			console.log("SMASHES+", $rootScope.totalSmashes);
			$scope.isActive = false;

			$scope.activeButton = function() {
					$scope.isActive = !$scope.isActive;
				};

				// $scope.totalValue.splice($scope.newSundayTask.task_total_value);
				$scope.newSundayTask.sunday_total --;

	//  console.log("In da delete task: " + id);
	 var sendID = {id: taskID};
	 $http({
		 method: 'DELETE',
		 url: 'sundayRoute/deleteSundayTask',
		 data: sendID,
		 headers: {'Content-Type': 'application/json;charset=utf-8'}

	 }).then(function(){
		//  $scope.showSundayTasks();
		//  $scope.sundayCheckTask();

	 });
 }; // End completeSundayTask


  // CHECK TASK COMPLETION -----------------------------------------------

    $scope.sundayCheckTask = function(){
        // console.log("DUE", $scope.newTask.day_due);
				var sundayCheck = function (){
						$http({

							method: 'POST',
							url: 'sundayRoute/moveSundayTask',
							data: $scope.newTask,

						}).then(function(){

							console.log("SEE YA TASK!");
							console.log(results);
							// $scope.showSundayTasks();

						}); // End then....
					 // end of if
				 };

        // console.log("All tasks are: ", $rootScope.allSundayTasks);

        for (var i = 0; i < $rootScope.allSundayTasks.length; i++) {
					console.log($rootScope.allSundayTasks[i].day_due);

					if ($rootScope.allSundayTasks[i].day_due < $rootScope.count && $rootScope.allSundayTasks[i].completed === false) {
						console.log(this.allSundayTasks[i]);

						sundayCheck();

					}

				}
    }; // End completeSundayTask


//------------------------------MONDAY--------------------------------


  $rootScope.mondayTotalValue=[];
  $rootScope.allMondayTasks=[];

    $scope.addMondayTask = function (){
      // console.log("button clicked");
			$rootScope.totalTasks++;

    $scope.newMondayTask = {
        name: $scope.nameIn,
        completed: false,
        day_due: 1,
        week_due: 1,
        task_total_value: 1,
        monday_total: 0,
      };

$rootScope.allMondayTasks.push($scope.newMondayTask);
// Pushing to $scope.totalValue array and adding
$rootScope.mondayTotalValue.push($scope.newMondayTask.task_total_value);
for(var i in $rootScope.mondayTotalValue) { $scope.newMondayTask.monday_total += $rootScope.mondayTotalValue[i]; }

    $http({
    method: 'POST',
    url:'sundayRoute/mondayTask',
    data: $scope.newMondayTask
  }).then(function(){

    $scope.showMondayTasks();
    // $scope.sundayCheckTask();

    });
      $scope.nameIn =''; // Reset input
  };

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

  // $scope.completeMondayTask = function(taskID){
  //   // event.preventDefault();
	// 	console.log("All SUNDAY tasks are: ", $scope.allSundayTasks);
	//
	// 			$rootScope.totalSmashes ++;
	//
  //       $scope.isActive = false;
	//
  //       $scope.activeButton = function() {
  //           $scope.isActive = !$scope.isActive;
  //         };
	//
	// 				// $scope.totalValue.splice($scope.newSundayTask.task_total_value);
	// 				$scope.newMondayTask.monday_total --;
	//
	// 	//  console.log("NOW TOTOAL:", $scope.newTask.monday_total);
	//
  //    console.log('completed a Monday task');
  //   //  console.log("In da delete task: " + id);
  //    var sendID = {id: taskID};
  //    $http({
  //      method: 'POST',
  //      url: 'sundayRoute/completeMondayTask',
  //      data: sendID
  //    }).then(function(){
  //     //  $scope.showSundayTasks();
  //     //  $scope.sundayCheckTask();
	//
  //    });
  //  }; // End completeSundayTask


	 $scope.completeMondayTask = function(taskID){
	     event.preventDefault();

			 			$rootScope.totalSmashes ++;

				      $scope.isActive = false;

				      $scope.activeButton = function() {
				          $scope.isActive = !$scope.isActive;
				        };

			 				// $scope.totalValue.splice($scope.newSundayTask.task_total_value);
			 				$scope.newMondayTask.monday_total --;

	     console.log("Monday total tasks AFTER DELETE", $scope.totalValue);

	      console.log('deleteMondayTask.js');
	     //  console.log("In da delete task: " + id);

	      var sendID = {id: taskID};
	      $http({
	        method: 'DELETE',
	        url: 'sundayRoute/deleteMondayTask',
	        data: sendID,
	        headers: {'Content-Type': 'application/json;charset=utf-8'}

	      }).then(function(){
	        // $scope.showMondayTasks();

	      });
	    };// End completeMondayTask


	 //------------------------------TUESDAY--------------------------------


	   $rootScope.tuesdayTotalValue=[];
	   $rootScope.allTuesdayTasks=[];

	     $scope.addTuesdayTask = function (){
	       // console.log("button clicked");
				 $rootScope.totalTasks++;

	     $scope.newTuesdayTask = {
	         name: $scope.nameIn,
	         completed: false,
	         day_due: 1,
	         week_due: 1,
	         task_total_value: 1,
	         tuesday_total: 0,
	       };

	 $rootScope.allTuesdayTasks.push($scope.newTuesdayTask);
	 // Pushing to $scope.totalValue array and adding
	 $rootScope.tuesdayTotalValue.push($scope.newTuesdayTask.task_total_value);
	 for(var i in $rootScope.tuesdayTotalValue) { $scope.newTuesdayTask.tuesday_total += $rootScope.tuesdayTotalValue[i]; }

	     $http({
	     method: 'POST',
	     url:'tuesdayRoute/tuesdayTask',
	     data: $scope.newTuesdayTask
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

			 			$rootScope.totalSmashes ++;

	         $scope.isActive = false;

	         $scope.activeButton = function() {
	             $scope.isActive = !$scope.isActive;
	           };

	 					// $scope.totalValue.splice($scope.newSundayTask.task_total_value);
	 					$scope.newTuesdayTask.tuesday_total --;

	 		//  console.log("NOW TOTOAL:", $scope.newTask.tuesday_total);

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

//------------------------------WEDNESDAY--------------------------------

 $rootScope.wednesdayTotalValue=[];
 $rootScope.allWednesdayTasks=[];

   $scope.addWednesdayTask = function (){
     // console.log("button clicked");
		 $rootScope.totalTasks++;

   $scope.newWednesdayTask = {
       name: $scope.nameIn,
       completed: false,
       day_due: 1,
       week_due: 1,
       task_total_value: 1,
       wednesday_total: 0,
     };

$rootScope.allWednesdayTasks.push($scope.newWednesdayTask);
// Pushing to $scope.totalValue array and adding
$rootScope.wednesdayTotalValue.push($scope.newWednesdayTask.task_total_value);
for(var i in $rootScope.wednesdayTotalValue) { $scope.newWednesdayTask.wednesday_total += $rootScope.wednesdayTotalValue[i]; }

   $http({
   method: 'POST',
   url:'wednesdayRoute/wednesdayTask',
   data: $scope.newWednesdayTask
 }).then(function(){

   $scope.showWednesdayTasks();

   });
     $scope.nameIn =''; // Reset input
 };

// SHOW TASKS -----------------------------------------------

 $scope.showWednesdayTasks = function(){
   // event.preventDefault();

 $http({
 method: 'GET',
 url:'wednesdayRoute/getWednesdayTasks'
}).then(function( response ){
 $scope.wednesdayTasks = response.data;

   }); // End of then function
 }; // End of $scope.showWednesdayTasks

 $scope.showWednesdayTasks();

// COMPLETE TASK -----------------------------------------------

 $scope.completeWednesdayTask = function(taskID){

	 $rootScope.totalSmashes ++;

       $scope.isActive = false;

       $scope.activeButton = function() {
           $scope.isActive = !$scope.isActive;
         };

					$scope.newWednesdayTask.wednesday_total --;

    console.log('completed a Wednesday task');
   //  console.log("In da delete task: " + id);
    var sendID = {id: taskID};
    $http({
      method: 'POST',
      url: 'wednesdayRoute/completeWednesdayTask',
      data: sendID
    }).then(function(){


    });
  }; // End complete Wednesday Task

	//------------------------------THURSDAY--------------------------------

	 $rootScope.thursdayTotalValue=[];
	 $rootScope.allThursdayTasks=[];

	   $scope.addThursdayTask = function (){
	     // console.log("button clicked");
			 $rootScope.totalTasks++;

	   $scope.newThursdayTask = {
	       name: $scope.nameIn,
	       completed: false,
	       day_due: 1,
	       week_due: 1,
	       task_total_value: 1,
	       thursday_total: 0,
	     };


	$rootScope.allThursdayTasks.push($scope.newThursdayTask);
	// Pushing to $scope.totalValue array and adding
	$rootScope.thursdayTotalValue.push($scope.newThursdayTask.task_total_value);
	for(var i in $rootScope.thursdayTotalValue) { $scope.newThursdayTask.thursday_total += $rootScope.thursdayTotalValue[i]; }

	   $http({
	   method: 'POST',
	   url:'thursdayRoute/thursdayTask',
	   data: $scope.newThursdayTask
	 }).then(function(){

	   $scope.showThursdayTasks();

	   });
	     $scope.nameIn =''; // Reset input

	 };

	// SHOW TASKS -----------------------------------------------

	 $scope.showThursdayTasks = function(){
	   // event.preventDefault();

	 $http({
	 method: 'GET',
	 url:'thursdayRoute/getThursdayTasks'
	}).then(function( response ){
	 $scope.thursdayTasks = response.data;

	   }); // End of then function
	 }; // End of $scope.showThursdayTasks

	 $scope.showThursdayTasks();

	// COMPLETE TASK -----------------------------------------------

	 $scope.completeThursdayTask = function(taskID){

		 $rootScope.totalSmashes ++;

	       $scope.isActive = false;

	       $scope.activeButton = function() {
	           $scope.isActive = !$scope.isActive;
	         };

						$scope.newThursdayTask.thursday_total --;

	    console.log('completed a Thursday task');
	   //  console.log("In da delete task: " + id);
	    var sendID = {id: taskID};
	    $http({
	      method: 'POST',
	      url: 'thursdayRoute/completeThursdayTask',
	      data: sendID
	    }).then(function(){


	    });
	  }; // End complete Thursday Task

		//------------------------------FRIDAY--------------------------------

		 $rootScope.fridayTotalValue=[];
		 $rootScope.allFridayTasks=[];

			 $scope.addFridayTask = function (){
				 // console.log("button clicked");
				 $rootScope.totalTasks++;

			 $scope.newFridayTask = {
					 name: $scope.nameIn,
					 completed: false,
					 day_due: 1,
					 week_due: 1,
					 task_total_value: 1,
					 friday_total: 0,
				 };

		$rootScope.allFridayTasks.push($scope.newFridayTask);
		// Pushing to $scope.totalValue array and adding
		$rootScope.fridayTotalValue.push($scope.newFridayTask.task_total_value);
		for(var i in $rootScope.fridayTotalValue) { $scope.newFridayTask.friday_total += $rootScope.fridayTotalValue[i]; }

			 $http({
			 method: 'POST',
			 url:'fridayRoute/fridayTask',
			 data: $scope.newFridayTask
		 }).then(function(){

			 $scope.showFridayTasks();

			 });
				 $scope.nameIn =''; // Reset input
		 };

		// SHOW TASKS -----------------------------------------------

		 $scope.showFridayTasks = function(){
			 // event.preventDefault();

		 $http({
		 method: 'GET',
		 url:'fridayRoute/getFridayTasks'
		}).then(function( response ){
		 $scope.fridayTasks = response.data;

			 }); // End of then function
		 }; // End of $scope.showFridayTasks

		 $scope.showFridayTasks();

		// COMPLETE TASK -----------------------------------------------

		 $scope.completeFridayTask = function(taskID){

			 $rootScope.totalSmashes ++;

					 $scope.isActive = false;

					 $scope.activeButton = function() {
							 $scope.isActive = !$scope.isActive;
						 };

							$scope.newFridayTask.friday_total --;

				console.log('completed a Friday task');
			 //  console.log("In da delete task: " + id);
				var sendID = {id: taskID};
				$http({
					method: 'POST',
					url: 'fridayRoute/completeFridayTask',
					data: sendID
				}).then(function(){


				});
			}; // End complete Friday Task

			//------------------------------SATURDAY--------------------------------

			 $rootScope.saturdayTotalValue=[];
			 $rootScope.allSaturdayTasks=[];

				 $scope.addSaturdayTask = function (){
					 // console.log("button clicked");
					 $rootScope.totalTasks++;

				 $scope.newSaturdayTask = {
						 name: $scope.nameIn,
						 completed: false,
						 day_due: 1,
						 week_due: 1,
						 task_total_value: 1,
						 saturday_total: 0,
					 };

			$rootScope.allSaturdayTasks.push($scope.newSaturdayTask);
			// Pushing to $scope.totalValue array and adding
			$rootScope.saturdayTotalValue.push($scope.newSaturdayTask.task_total_value);
			for(var i in $rootScope.saturdayTotalValue) { $scope.newSaturdayTask.saturday_total += $rootScope.saturdayTotalValue[i]; }

				 $http({
				 method: 'POST',
				 url:'saturdayRoute/saturdayTask',
				 data: $scope.newSaturdayTask
			 }).then(function(){

				 $scope.showSaturdayTasks();

				 });
					 $scope.nameIn =''; // Reset input
			 };

			// SHOW TASKS -----------------------------------------------

			 $scope.showSaturdayTasks = function(){
				 // event.preventDefault();

			 $http({
			 method: 'GET',
			 url:'saturdayRoute/getSaturdayTasks'
			}).then(function( response ){
			 $scope.saturdayTasks = response.data;

				 }); // End of then function
			 }; // End of $scope.showSaturdayTasks

			 $scope.showSaturdayTasks();

			// COMPLETE TASK -----------------------------------------------

			 $scope.completeSaturdayTask = function(taskID){

				 $rootScope.totalSmashes ++;

						 $scope.isActive = false;

						 $scope.activeButton = function() {
								 $scope.isActive = !$scope.isActive;
							 };

								$scope.newSaturdayTask.saturday_total --;

					console.log('completed a Saturday task');
				 //  console.log("In da delete task: " + id);
					var sendID = {id: taskID};
					$http({
						method: 'POST',
						url: 'saturdayRoute/completeSaturdayTask',
						data: sendID
					}).then(function(){

					});
				}; // End complete Saturday Task

}]); // End of list controller
