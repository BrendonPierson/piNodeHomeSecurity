$(document).foundation();
var app = angular.module("SecureApp", ['ngRoute', "firebase", "rzModule", "n3-line-chart"]);

// This first part tells the app that auth is required, 
//if the user isn't logged in it redirects to the login page
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the login page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

// This designates the view and controller based on the route
// The resolve bit is what prevents a user from seeing anything untill they 
// are logged in.
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when("/login", {
      controller: "LoginCtrl",
      templateUrl: "partials/login.html",
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
        }]
      }
    }).
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    }).
    when('/stats', {
      templateUrl: 'partials/stats.html',
      controller: 'StatsCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/arm', {
      templateUrl: 'partials/arm.html',
      controller: 'ArmCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/video', {
      templateUrl: 'partials/video.html',
      controller: 'VideoCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/tempGraph', {
      templateUrl: 'partials/tempGraph.html',
      controller: 'TempGraphCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);

