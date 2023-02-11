# angularjs-training

Si te ha tocado entrar en un proyecto legacy aquí tienes una pequeña intro a la tecnología

Dentro de la carpeta _demos_ encontrarás ejemplos que incluyen una guía paso a paso para reproducirlos (salvo el primero que lo que hace es presentarte la estructura de partida del proyecto)

## 00 Boilerplate

En este ejemplo vamos a analizar el proyecto con el que arrancamos y como se organiza (es un proyecto que se ha creado con Angular 1.6, webpack y soporte a TypeScript).

## 01 Routing

En este ejemplo utilizamos ui-router para crear una ruta de login y otra de listado de clientes.

## 02 Login Layout

Cuando se desarrollaba con AngularJS era muy normal utilizar Bootstrap para estilar y maquetar el proyecto, aquí tienes una pequeña introducción y te indicamos como consultar la API de la versión con la que estés trabajando en el proyecto.

## 03 Client List Layout

En este ejemplo aprenderás a componentizar, si tiene la suerte de estar en una de las versiones más actuales de AngularJS esto te puede ser de gran ayuda.

Aquí nos centraremos en montar un layout estático, y aprenderemos a pasar parametros de un componente padre a un componente hijo.

## 04 Service

Aquí aprenderemos a crear un servicio que simule una llamada para validar un login, simularemos que la llamada es asíncrona y así nos familiarizaremos con $Q y la inyección dependencias de Angularjs.

## 05 Form

Aquí creamos un formulario de login y lo conectamos con el servicio previamente creado, si el login tiene éxito navegamos por código a la ventana de listado, si no mostramos una tostada (para ello utilizamos la librería externa _angular-toaster_, aprenderemos a importar una libería de terceros.

## 06 Form Validation

Aquí aprendemos a gestionar la validación de un formulario, trabajamos con las directivas de validación de _angular_ también con _angular-message_ para poder extraer plantillas de errores y no tener que repetir código, y también aprenderemos a hacer un override cuando nos haga falta, también jugaremos con los valores _pristine_ y _error_ del motor de validaciones de angular, y encontrarás enlaces de utilidad si quieres crear validadores custom.

## 07 Http Client List

En este último ejemplo aprendemos a interactuar con una API REST, para ello utilizaremos el servicio _$http_ de angular, y pasaremos como paremetro de binding la lista al componente que pinta los resultados, y usaremos la directiva _ng-repeat_ para iterar por la lista y crear una card por cada cliente en la lista

