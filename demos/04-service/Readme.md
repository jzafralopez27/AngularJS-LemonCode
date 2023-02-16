# 04 Servicios

En Angularjs, los servicios son objetos que se encargan de realizar tareas específicas, como por ejemplo, comunicarse con un servidor, o realizar cálculos matemáticos.

Utilizando servicios evitamos poner lógica en los controladores /componentes, y así, mantenerlos lo más limpios posibles.

Los servicios se definen en un fichero aparte, y se inyectan en los controladores /componentes (hola inyección de dependencias).

Otro tema muy interesante es que en AngularJS los servicios siempre son singleton, es decir sólo hay una instancia de cada servicio para toda la aplicación (acuérdate de que en Angular 2+ puedes elegir si quieres que sea singleton o no).

En este ejemplo vamos a crear un servicio que simule la validación de un login, lo haremos tanto en sabor síncrono, como asíncrono (simulando la llamada a un servidor).

# Paso a paso

- Partimos del ejemplo anterior, como siempre, copiamos el contenido y hacemos un:

_npm install_

- Vamos ahora a ver dónde colocar los servicios:

  - En proyectos antiguos te puedes encontrar con una carpeta que se llama _services_ donde sueltas todos los servicios de la aplicación, esto está bien para proyectos pequeños, si un proyecto crece mucho, se puede convertir en un infierno encontrar un servicio o saber a en que ventanas se usaba o si es común (si estás en este caso, lo mejor que puedes hacer es aprender a buscar fichero en el árbol de visual studio code, es muy útil).

  - En proyectos más modernos lo normal es tener los servicios relacionados con una ventana / componente en la misma carpeta, y los que se usen en varios en una carpeta _common_ (o como quieras llamarla), de esta manera creas islas de funcionalidad y el proyecto es más manejable.

En nuestro caso el servicio de login lo vamos a colocar debajo de la página de _login_.

```
\---src
    |   index.html
    |
    \---app
        +---pages
        |   \---login
        |   |       index.ts
        |   |       login.component.ts
        |   |       login.html
        |   |       login.service.ts
        |   \---client
        +---model
        +---state
```

- Vamos a implementar el servicio de login, para ello creamos un fichero _login.service.ts_ en la carpeta _login_.

_./src/app/pages/login/login.service.ts_

```typescript
import * as angular from "angular";

export class LoginService {
  constructor() {}

  public validateLogin(user: string, pwd: string): boolean {
    return false;
  }
}
```

Nos paramos un segundo y analizamos esto:

- Un servicio es una clase de JavaScript.
- Tenemos un constructor, en el mismo podríamos inyectar dependencias, pero en este caso no necesitamos nada.
- Tenemos un método público que recibe dos parámetros, y devuelve un booleano: _validateLogin_ este es el que llamaremos desde nuestra página cuando queramos validar las credenciales que introduzca el usuario.

- Vamos a implementar el método login de manera síncrona (con datos mocks, es decir no es una implementación real, lo normal sería realizar una llamada a servicio web que nos diera una respuesta desde servidor, JAMAS pongas claves en tu código que se ejecuta en cliente).

_./src/app/pages/login/login.service.ts_

```diff
  public validateLogin(user : string, pwd: string) : boolean {
-    return false;
+    return (user === 'user@email.com' && pwd === 'test');
  }
```

Bueno, esto podríamos engancharlo desde la página (previo registro del servicio a nivel de módulo), pero queremos simular una llamada asíncrona, aquí viene un tema interesante:

- Cuando Angularjs se publicó en tema de las promesas y temas tales como _async/await_ o bien no existía, o habían navegadores que no lo soportaban.
- El equipo de _angularjs_ fusiló una librería que se llamaba _q_, que era una implementación de promesas, y la incluyó en el core de angularjs.

Así que en proyectos _angularjs_ es muy normal que te encuentras con _$q_ por todos sitios :).

Vamos a ver como simular que estamos haciendo una llamada asíncrona en el método _validateLogin_.

- Primero tenemos que pedir $q a angularjs, para ello tenemos que inyectarlo en el constructor del servicio.

_./src/app/pages/login/login.service.ts_

```diff
export class LoginService {
+  $q : angular.IQService = null;

-  constructor() {
+ constructor($q : angular.IQService) {
+  this.$q = $q;
  }

 public validateLogin(user : string, pwd: string) : boolean {

    return (user === 'admin' && pwd === 'test');
  }
}

+ LoginService.$inject = ['$q'];
```

¿Qué estamos haciendo aquí?

- Le pedimos a angularJS que cuando se instancie el servicio de login busque al servicio $q (viene incluido en AngularJS) y nos lo asignen a la variable miembro  _$q_.

- Para evitar problemas cuando minifiquemos el código, utilizamos la anotación para indicarle que busque el servicio $q (ojo depende de la versión de angular y aproximación, esto te lo puedes encontrar resuelto de varias formas).

- Vamos ahora a cambiar la implementación del método _validateLogin_ para que devuelva una promesa.

_./src/app/pages/login/login.service.ts_

```diff
- public validateLogin(user: string, pwd: string): boolean {
+  public validateLogin(user : string, pwd: string) : angular.IPromise<boolean> {
-  return user === "admin" && pwd === "test";
+  const deferred = this.$q.defer<boolean>();
+  const validationResult = (user === 'user@email.com' && pwd === 'test');
+  deferred.resolve(validationResult);
+
+    return deferred.promise;
}
```

De esta manera, cuando llamemos a _validateLogin_ nos devolverá una promesa, y desde la página podemos esperar a que esta se resuelva y validar el resultado.

Esto es lo que llamamos una _implementación mock_, lo bueno es que la firma del método nos vale para implementar una llamada asíncrona contra servidor y sólo tendríamos que introducir el código aquí, el de la página se quedaría como está.

Toca registrar el servicio a nivel de aplicación para que esté disponible.

_./src/app/app.ts_

```diff
import { ClientListCardComponent } from "./pages/client-list/card/client-list-card.component";
+ import {LoginService} from './pages/login/login.service';

angular
  .module("app", ["ui.router"])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent)
  .component("clientlist", ClientListComponent)
  .component("clientlistsearch", ClientListSearchComponent)
  .component("clientlistresult", ClientListResultComponent)
  .component("clientlistcard", ClientListCardComponent);
+ .service('LoginService', LoginService);
```

Vámonos ahora al componente de login, y vamos a pedir el servicio que hemos creado a invocarlo, que hacemos aquí

- Pedimos en el constructor el servicio que hemos creado (LoginService), así el motor de inyección de dependencias de angularjs se encargará de instanciarlo y pasárnoslo.

- Lo invocamos para comprobar que funciona (esperamos a que la promesa se resuelva).

Fíjate que hay un _import_ del servicio, esto lo usamos sólo para resolver el tipado de TypeScript.

_./src/app/pages/login/login.component.ts_

```diff
+ import { LoginService } from "./login.service";
+
+ class LoginPageController {
+  private loginService: LoginService;
+
+  constructor(LoginService: LoginService) {
+    "ngInject";
+    this.loginService = LoginService;
+  }
+ }

export const LoginComponent = {
  template: require("./login.component.html") as string,
+ controllerAs: 'vm',
+ controller: LoginPageController,
};

+ LoginPageController.$inject = ['LoginService'];
```

- Vamos ahora hacer una pequeña prueba para asegurarnos que funciona (después moveremos este código del _$onInit_ al handler del botón de _login_), ¿Qué hacemos aquí?
  - Implementamos un método que invoque al login y como prueba mostramos un alert con el resultado.
  - Ese método lo invocamos de desde _$onInit_ para que se ejecute cuando el componente esta ya inicializado y montando el DOM.

_./src/app/pages/login/login.component.ts_

```diff
class LoginPageController {
  private loginService: LoginService;

  constructor(LoginService: LoginService) {
    "ngInject";
    this.loginService = LoginService;
  }

+  public $onInit() {
+    this.validateLogin("admin", "test");
+  }

+  validateLogin = (login : string, password :string) => {
+    this.loginService.validateLogin(login, password).then(
+       (succeeded) => {
+         if(succeeded) {
+            alert('login succeeded');
+         } else {
+           alert('login failed');
+         }
+       }
+    );
+ }
}
```

Así pues nada más arrancar la aplicación se mostrará un alert.

```bash
npm start
```
