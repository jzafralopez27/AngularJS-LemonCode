app.controller('MoviesListController', ['$scope', '$http', function($scope, $http) {
    $http.get('http://localhost:3001/movies')
      .then(function(response) {
        $scope.movies = response.data;
      })
      .catch(function(error) {
        console.error('Error mostrando la peli:', error);
      });
  }]);