app.controller("HomeCtrl", [
  "$scope", 
  "Auth",
  "$firebaseObject", 
  "$timeout", 
  "$mdSidenav", 
  "$mdUtil", 
  "$log",
  function($scope, Auth, $firebaseObject, $timeout, $mdSidenav, $mdUtil, $log){
    // Load data from firebase
    var ref = new Firebase("https://securepenning.firebaseio.com/");
    
    $scope.home = $firebaseObject(ref);

    $scope.home.$bindTo($scope, "home");

    // Side nav logic
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }
    // Close sideNav
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };


    // Login Function
    $scope.login = function(){
      ref.authWithPassword({
        email : $scope.email,
        password : $scope.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.auth = authData;
        }
      });
    }
    // Sets auth again in case user refreshes page
    $scope.auth = Auth.$getAuth();


}]);
