console.log('hello from dayController.js');


myApp.controller('HomeController', [ '$scope', '$http', function ($scope, $http) {

      $scope.iterate = function(){
          CounterService.iterate();
          console.log("HERE: " , CounterService.counter.count);
      };
}]);

      myApp.factory("CounterService", [function(){

        var cat = {
          count : 1
        };

        var catIterate = function(){
          cat.count++;
          console.log(cat.count);
        };

        //public
        return {
          counter : cat,
          iterate : catIterate
    };
}]);
