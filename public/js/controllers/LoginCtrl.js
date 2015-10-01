app.controller("LoginCtrl", 
  ["currentAuth", 
  "$scope", 
  "Auth", 
  "$location",
  "$timeout",
  function(currentAuth, $scope, Auth, $location, $timeout) {

  $scope.auth = Auth.$getAuth();

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
            $location.path("/home");
        }, 0);
      }
    });
  }

  

  $scope.logout = function() {
    Auth.$unauth();
    $location.path("/home");
  }



}]);


