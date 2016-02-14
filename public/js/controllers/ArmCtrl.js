app.controller("ArmCtrl",
  ["$scope",
  "FBFactory",
  function($scope, fb) {
    // Get all the data from firebase and setup 3 way data binding
    fb.getSecurity().$bindTo($scope, "security")
  }])
