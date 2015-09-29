app.controller("HomeCtrl", [
  "$scope", 
  "$firebaseObject", 
  "$timeout", 
  "$mdSidenav", 
  "$mdUtil", 
  "$log",
  function($scope, $firebaseObject, $timeout, $mdSidenav, $mdUtil, $log){
    var ref = new Firebase("https://securepenning.firebaseio.com/");
    $scope.home = $firebaseObject(ref);


    $scope.home.$loaded()
      .then(function() {
        console.log($scope.home);
      })
      .catch(function(err) {
        console.error(err);
      });

    $scope.home.$bindTo($scope, "home");

    // Side nav logic
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
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

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

      ref.authWithPassword({
        email : "BrendonPierson@gmail.com",
        password : "h0meSlugCastle*"
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });




      // ref.createUser({
      //   email    : "BrendonPierson@gmail.com",
      //   password : "h0meSlugCastle*"
      // }, function(error, userData) {
      //   if (error) {
      //     console.log("Error creating user:", error);
      //   } else {
      //     console.log("Successfully created user account with uid:", userData.uid);
      //   }
      // });

}]);