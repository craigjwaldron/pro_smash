myApp.controller('dayController', [ '$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

  $rootScope.count = 0;

  $scope.iterate = function(){
    
  $rootScope.count++;
  console.log('Current day is: ', $rootScope.count);

  };
}]);
