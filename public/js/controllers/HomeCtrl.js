app.controller("HomeCtrl", 
  ["$scope", 
  "Auth", 
  function($scope, Auth) {
    $scope.auth = Auth;

    $scope.home = "Home";

    console.log("auth", $scope.auth.$getAuth());
}]);