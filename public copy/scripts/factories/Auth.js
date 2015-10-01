app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://securepenning.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);