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

      $scope.home.$bindTo($scope, "home");


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