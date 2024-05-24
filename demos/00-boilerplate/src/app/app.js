var app = angular.module('movieApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/movies', {
      templateUrl: 'movies-list.html',
      controller: 'MoviesListController'
    })
    .when('/movies/:id', {
      templateUrl: 'movie-edit.html',
      controller: 'MovieEditController'
    })
    .otherwise({
      redirectTo: '/movies'
    });
}]);
