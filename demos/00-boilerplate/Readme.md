Este proyecto es muy similar al del anterior módulo, pero esta vez creado con Angular JS. 
Explico un poco lo realizado, sobretodo en los archivos .js que son lo nuevo:

En app.js:

Creo un módulo de AngularJS llamado movieApp con la dependencia ngRoute para controlar las rutas, se configura el proveedor de rutas ($routeProvider) para definir diferentes rutas, la ruta /movies carga la plantilla movies-list.html y usa el controlador MoviesListController. También, la ruta /movies/:id carga la plantilla movie-edit.html y usa el controlador MovieEditController.

![app](https://github.com/jzafralopez27/AngularJS-LemonCode/assets/149962801/efb0024e-db37-40e8-8ce7-3f5e0d5b0bf9)

En movieEditController.js:

Utilizo los servicios $scope, $http, $routeParams, y $location.

Obtiene el ID de la película de los parámetros de la URL, y realiza una petición GET al servidor para pillar los datos datos de la peli que pedimos.
Si la petición sale bien, se almacenan los datos de la película en $scope.movie. Si hay un error, se imprime un mensaje que nos avisa del error.

La función saveMovie se llama al guardar la película, verifica que el formulario es válido antes de enviar los datos y realiza una petición PUT, que actualiza la peli con la información que le metemos nosotros. Si todo esto se logra, nos lleva al a lista, y si no, pues nos imprime un mensaje de error.

![movieEditController](https://github.com/jzafralopez27/AngularJS-LemonCode/assets/149962801/2caaa6b6-cebc-4d7d-8422-2102e4775fbe)
