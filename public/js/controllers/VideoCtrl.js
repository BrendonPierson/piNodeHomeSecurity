app.controller("VideoCtrl", 
  ["$scope", 
  "$location",
  function($scope, $location) {
    console.log("host", $location.host());
    // Determine whether to use localhost or external address
    $scope.displayLocal = $location.host() === "localhost" ? true : false;
}]);