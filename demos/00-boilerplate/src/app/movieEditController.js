app.controller('MovieEditController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
    var movieId = $routeParams.id;
  
    $http.get('http://localhost:3001/movies/' + movieId)
      .then(function(response) {
        $scope.movie = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching movie:', error);
      });
  
    $scope.saveMovie = function() {
      if ($scope.movieForm.$valid) {
        $http.put('http://localhost:3001/movies/' + movieId, $scope.movie)
          .then(function() {
            $location.path('/movies');
          })
          .catch(function(error) {
            console.error('Error saving movie:', error);
          });
      }
    };
  }]);
  