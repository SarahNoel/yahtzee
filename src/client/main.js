var app = angular.module('diceApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/stats', {
      templateUrl: 'partials/stats.html'
    })
    .when('/loginpage', {
      templateUrl: 'partials/login.html'
    })
    .when('/logoutpage', {
      templateUrl: 'partials/logout.html'
    })
    .otherwise({redirectTo: '/'});
}]);
