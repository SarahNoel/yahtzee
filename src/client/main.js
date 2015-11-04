var app = angular.module('diceApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/play', {
      templateUrl: 'partials/game.html'
    })
    .when('/stats', {
      templateUrl: 'partials/stats.html'
    })
    .when('/loginpage', {
      templateUrl: 'partials/login.html'
    })
    .when('/register', {
      templateUrl: 'partials/register.html'
    })
    .otherwise({redirectTo: '/'});
}]);
