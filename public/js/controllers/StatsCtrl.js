app.controller("StatsCtrl", 
  ["$scope", 
  "Auth",
  "$firebaseObject", 
  function($scope, Auth, $firebaseObject) {
  
  var ref = new Firebase("https://securepenning.firebaseio.com/");

  $firebaseObject(ref).$bindTo($scope, "stats");

  

}]);