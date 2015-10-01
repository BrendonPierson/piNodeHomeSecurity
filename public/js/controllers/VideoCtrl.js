app.controller("VideoCtrl", 
  ["$scope", 
  "Auth", 
  function($scope, Auth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

    $scope.auth = Auth;


    console.log("auth", $scope.auth.$getAuth());


}]);