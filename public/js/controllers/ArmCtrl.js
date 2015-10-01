app.controller("ArmCtrl", 
  ["$scope", 
  "Auth",
  "$firebaseObject", 
  function($scope, Auth, $firebaseObject) {
  $(document).foundation();
  
  var ref = new Firebase("https://securepenning.firebaseio.com/");

  $firebaseObject(ref).$bindTo($scope, "stats");


  

}]);