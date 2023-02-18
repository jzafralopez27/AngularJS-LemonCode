# 05 Form

Bueno ya sabemos cómo ejecutar el servicio de login, vamos a ver ahora como rellenar un formulario y pasarle los datos al controlador del componente para que los procese.

# Paso a paso

- Partimos del ejemplo anterior, como siempre, copiamos el contenido y hacemos un:

```bash
npm install
```

- En el controlador de nuestro loginform vamos a añadir dos variables miembros para almacenar el usuario y la contraseña:

_./src/app/pages/login/login.component.ts_

```diff
class LoginPageController {
+  user: string;
+  password: string;
  private loginService: LoginService;
```

- Vamos ahora a enlazar estos datos, así como la llamada al método que creamos previamente _validateLogin_ al HTML:

_./src/app/pages/login/login.component.html_

```diff
<input
  type="email"
  class="form-control"
  style="border-radius: 0px"
  id="exampleInputEmail1"
  placeholder="Enter email"
+ ng-model="vm.user"
/>
```

_./src/app/pages/login/login.component.html_

```diff
<input
  type="password"
  class="form-control"
  style="border-radius: 0px"
  id="exampleInputPassword1"
  placeholder="Password"
+ ng-model="vm.password"
/>
```

¿Qué estamos haciendo aquí? Esto funciona de una manera muy parecida al _ngModel_ de Angular 2, estamos haciendo un binding two way, si el input cambia la variable miembro _vm.user_ se actualizar, y si _vm.user_ se actualiza en el controlador, el input se actualiza.

Fíjate que usamos el prefijo "vm" porque lo hemos definido en el controlador como _vm_, sino indicamos nada se usa _$ctrl_.

Vamos ahora a enlazar el botón de login con el método que creamos en el controlador:

_./src/app/pages/login/login.component.html_

```diff
<button
  type="submit"
  class="btn btn-sm btn-default"
+ ng-click="vm.validateLogin(vm.user, vm.password)"
>
  Sign in
</button>
```

Antes de probar el ejemplo, vamos a quitar la entrada de _ngInit_ para que no salte el _alert_ nada más mostrarse el componente.

_./src/app/pages/login/login.component.ts_

```diff
-  public $onInit() {
-    this.validateLogin("user@email.com", "test");
-  }
```

- Vamos a ver qué tal funciona esto (acuérdate que el usuario es: user@email.com y la clave es: test)

```bash
npm start
```

- Vamos a quitar los alerts y hacer que la aplicación funcione, primero, cuando el login tenga éxito, vamos a navegar a la página de clientes.

En este caso estamos usando _ui-router_ (si estás usando _angular-router_ tendrías que usar otro método pero es una aproximación parecida), para navegador por código JS nos traemos el _StateService_ y lo inyectamos en el constructor:

_./src/app/pages/login/login.component.ts_

```diff
import { LoginService } from "./login.service";
+ import { StateService } from '@uirouter/angularjs';

class LoginPageController {
  user: string;
  password: string;
  private loginService: LoginService;
+  $state: StateService;

-  constructor(loginService: LoginService) {
+  constructor(
+    loginService: LoginService,
+    $state: StateService,
+  ) {
    "ngInject";
    this.loginService = loginService;
+   this.$state = $state;
  }

//(..)

- LoginPageController.$inject = ["loginService"];
+ LoginPageController.$inject = ["loginService", "$state"];

```

Y navegamos a la página cliente desde el método _validateLogin_:

_./src/app/pages/login/login.component.ts_

```diff
  validateLogin = (login: string, password: string) => {
    this.loginService.validateLogin(login, password).then((succeeded) => {
      if (succeeded) {
-        alert("login succeeded");
+        this.$state.go("clientlist");
      } else {
        alert("login failed");
      }
    });
  };
```

> ¿De dónde sale ese _clientlist_? Échale un ojo al fichero _app.routing.ts_

- Para terminar, ¿No sería mejor en vez de mostrar un alert cuando el login falla, mostrar algo más amigable para el usuario? Por ejemplo un mensaje de tipo "tostada".

Vamos a aprender consumir una librería de terceros.

En este caso vamos a usar la librería [angular-toastr](https://github.com/Foxandxss/angular-toastr) en este caso ya tenemos instaladas las dependecias y el tipado en el proyecto (puedes verlo en el fichero _package.json_).

También está configurada con su punto de entrada en el fichero _webpack.config.js_

> Si te hace falta añadir una librería nueva en tu proyecto Angularjs, primero consúltalo con el responsable del proyecto y también que te indique como las introducen en la solución.

Vamos a ver cómo darle uso en una aplicación angular, para ello primero nos vamos al módulo e indicamos que la vamos a usar:

_./src/app/app.ts_

```diff
angular
  .module("app", ["ui.router",
+  "toastr"
  ])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent)
  .component("clientlist", ClientListComponent)
  .component("clientlistsearch", ClientListSearchComponent)
  .component("clientlistresult", ClientListResultComponent)
  .component("clientlistcard", ClientListCardComponent)
  .service("LoginService", LoginService);
```

- Ahora nos vamos al _login.component.ts_ y vamos a usar la librería para mostrar un mensaje de error cuando el login falle.

_./src/app/pages/login/login.component.ts_

```diff
import { LoginService } from "./login.service";
import { StateService } from "@uirouter/angularjs";
+ import {IToastrService} from 'angular-toastr';

class LoginPageController {
  user: string;
  password: string;
  private loginService: LoginService;
  $state: StateService;
+ toastr : IToastrService;

  constructor(
    loginService: LoginService
    $state: StateService,      
+   toastr : IToastrService,
  ) {
    "ngInject";
    this.loginService = loginService;
    this.$state = $state;
+   this.toastr = toastr;    
  }

  //(...)

- LoginPageController.$inject = ["loginService", "$state"];
+ LoginPageController.$inject = ["loginService", "$state", "toastr"];
```

Y ahora vamos a usar el servicio _toastr_ en el método _validateLogin_:

_./src/app/login/login.component.ts_

```diff
  validateLogin = (login: string, password: string) => {
    this.loginService.validateLogin(login, password).then((succeeded) => {
      if (succeeded) {
        this.$state.go("clientlist");
      } else {
-        alert("login failed");
+        this.toastr.error('Incorrect login or password, please try again, Pssst login: user@email.com pwd: test');
      }
    });
  };
```

- Vamos a probarlo, si todo ha ido bien, deberías ver un mensaje de error cuando el login falle.

```bash
npm start
```
