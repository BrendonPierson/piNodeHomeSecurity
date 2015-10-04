app.controller("LoginCtrl", 
  ["$scope", 
  "Auth", 
  "$location",
  "$timeout",
  function($scope, Auth, $location, $timeout) {

  // Set auth to determine if login or logout is displayed
  $scope.auth = Auth.$getAuth();

  // Login Function
  $scope.login = function(){
    var ref = new Firebase("https://securepenning.firebaseio.com");
    ref.authWithPassword({
      email    : $scope.email,
      password : $scope.password  
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $scope.auth = authData;
        console.log("Authenticated successfully with payload:", authData);
        $timeout(function () {
            $location.path("/stats");
        }, 0);
      }
    });
  }

  // Logout Function
  $scope.logout = function() {
    Auth.$unauth();
    $location.path("/home");
  }

}]);


