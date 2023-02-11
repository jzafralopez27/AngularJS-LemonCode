# 05 Form

Bueno ya sabemos como ejecutar el servicio de login, vamos a ver ahora como rellenar un formulario y pasarle los datos al controlador del componente para que los procese.

# Paso a paso

- Partimos del ejemplo anterior, como siempre, copiamos el contenido y hacemos un:

```bash
npm install
```

- En el controlador de nuestro loginform vamos a añadir dos variables miembros para almacenar el usuario y la contraseña:

_./src/app/login/login.component.ts_

```diff
class LoginPageController {
+  user: string;
+  password: string;
  private loginService: LoginService;
```

- Vamos ahora a enlazar estos datos, así como la llamada al método que creamos previamente _validateLogin_ al HTML:

_./src/app/login/login.component.html_

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

_./src/app/login/login.component.html_

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

Fíjate que usamos el prefijo "vm" por que lo hemos definido en el controlador como _vm_, si no indicamos nada se usa _$ctrl_.

Vamos ahora a enlazar el botón de login con el método que creamos en el controlador:

_./src/app/login/login.component.html_

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

_./src/app/login/login.component.ts_

```diff
-  public $onInit() {
-    this.validateLogin("user@email.com", "test");
-  }
```

- Vamos a ver que tal funciona esto (acuérdate que el usuario es: user@email.com y la clave es: test)

```bash
npm start
```

- Vamos a quitar los alerts y hacer que la aplicación funcione, primero, cuando el login tenga éxito, vamos a navegar a la página de clientes.

En este caso estamos usando _ui-router_ (si estás usando _angular-router_ tendrías que usar otro método pero es una aproximación parecida), para navegador por código JS nos traemos el _StateService_ y lo inyectamos en el constructor:

_./src/app/login/login.component.ts_

```diff
import { LoginService } from "./login.service";
+ import { StateService } from '@uirouter/angularjs';

class LoginPageController {
  private loginService: LoginService;
+  $state: StateService;

  constructor(
+   $state: StateService
    loginService: LoginService) {
    "ngInject";
+    this.$state = $state;
    this.loginService = loginService;
  }

//(..)

- LoginPageController.$inject = ["LoginService"];
+ LoginPageController.$inject = ['$state', "LoginService"];

```

Y navegamos a la página cliente desde el método _validateLogin_:

_./src/app/login/login.component.ts_

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

> ¿De donde sale ese _clientlist_? Échale un ojo al fichero _app.routing.ts_
