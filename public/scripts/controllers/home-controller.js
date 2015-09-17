app.controller("HomeCtrl", ["$scope", "$firebaseObject", 
  function($scope, $firebaseObject){
    var ref = new Firebase("https://securepenning.firebaseio.com/");

    $scope.home = $firebaseObject(ref);

    $scope.home.$loaded()
      .then(function() {
        console.log($scope.home);
      })
      .catch(function(err) {
        console.error(err);
      });


}]);