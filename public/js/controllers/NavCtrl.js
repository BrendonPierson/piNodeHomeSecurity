app.controller("NavCtrl", 
  ["$scope", 
  "Auth", 
  function($scope, Auth) {
    // Use auth to determine if user sees login or logout in menu
    $scope.auth = Auth;
    console.log("auth", $scope.auth.$getAuth());
}]);