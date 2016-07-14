myApp.controller('dayController', [ '$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

  $rootScope.count = 0;

  $scope.iterate = function(){
  	console.log('BUTTON CLICKED');

  $rootScope.count++;
  console.log("SOPE", $rootScope.count);

  };
}]);
