# 07 Lista de clientes tirando de rest api

Cuando creamos un formulario, es importante darle feedback al usuario si ha introducido los datos correctamente o no, y mostrar un mensaje debajo del campo indicando el error en caso de que no sea correcto.

_Angularjs_ trae fontanería para hacer esto de forma sencilla, y es algo parecido a lo que actualmente usa _Angular_.

En este ejemplo vamos a añadir las siguientes validaciones:

- El login es un campo obligatorio y tiene que ser un email bien formado.
- La contraseña en un campo obligatorio.

# Paso a paso

- Partimos del ejemplo anterior, como siempre, copiamos el contenido y hacemos un:

```bash
npm install
```

- Vámonos al formulario de login y en cada etiqueta añadimos el validador campo `required`:

```diff
            <div class="form-group">
              <label for="exampleInputEmail1">Username or Email</label>
              <input
                type="email"
                class="form-control"
                style="border-radius: 0px"
                id="exampleInputEmail1"
                placeholder="Enter email"
                ng-model="vm.user"
+               ng-required="true"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"
                >Password
                <a href="/sessions/forgot_password">(forgot password)</a></label
              >
              <input
                type="password"
                class="form-control"
                style="border-radius: 0px"
                id="exampleInputPassword1"
                placeholder="Password"
                ng-model="vm.password"
+               ng-required="true"
              />
            </div>
```

Ahora al formulario vamos a darle un nombre para poder ver el estado del mismo desde otra parte del HTML.

```diff
- <form role="form">
+ <form role="form" name="loginForm">
```

- Ahora vamos a desactivar el botón de login en el caso de que el usuario no haya introducido datos en el formulario o los datos sean incorrectos.

```diff
    <button
      type="submit"
      class="btn btn-sm btn-default"
      ng-click="vm.validateLogin(vm.user, vm.password)"
+      ng-disabled="loginForm.$pristine || loginForm.$invalid"
    >
```

> Fijate que los validadores están implementados como directivas (ng-required) y que para deshabilitar el componente usamos otra directiva, ng-disabled.

> _loginForm_ es el nombre que le pusimos al formulario.

Si ahora probamos podemos ver que hasta que no informados los dos campos, el botón de login no se activa.

```bash
npm start
```

Vamos ahora a mostrar los mensajes de error debajo de cada campo, para ello vamos a ayudarnos de la librería _angular-message_, como tema a tener en cuenta esta librería nos permite reusar una plantilla de errores, ahorrando así código.

Este librería ya la tenemos instalada en el proyecto (ver _package.json), y también está incorporada al bundle (ver \_webpack.config.js_).

- Vamos a importarla en nuestra aplicación _angularjs_

_./src/app/app.ts_

```diff
angular
  .module("app", ["ui.router",
+                 "ngMessages",
                  "toastr"])
  .config(routing)
```

Vamos a mostrar la validación en el campo _username or email_

_./src/app/pages/login/login.component.html_

```diff
    <div class="form-group">
      <label for="exampleInputEmail1">Username or Email</label>
      <input
+       name="loginField"
        type="email"
        class="form-control"
        style="border-radius: 0px"
        id="exampleInputEmail1"
        placeholder="Enter email"
        ng-model="vm.user"
        ng-required
      />
+     <div ng-messages="loginForm.loginField.$error">
+      <p ng-message="required">Please inform the field</p>
+      <p ng-message="email">Please inform a valid email</p>
+     </div>
    </div>
```

> Fíjate que tenemos un mensaje para saber si el email es valido y funciona ¿Por qué si no hemos añadido ninguna directiva de validación para el email? Porque Angularjs se integra con los validadores de HTML5, en este caso el input type de esa caja de texto es _email_.

Vamos a probar y ver el mensaje que aparece.

```bash
npm start
```

Perfecto, ¿Hacemos lo mismo para el campo de la contraseña? Sería un poco rollo ir rellenando el mismo markup de error en plan copia y pega, una ventaja de _angular-messages_ es que podemos crear una plantilla de error y reutilizarla en todos los campos que queramos.

_./src/app/pages/login/login.component.html_

```diff
+<script type="text/ng-template" id="form-error-messages">
+  <div ng-message="required">Please inform the field</div>
+  <p ng-message="email">Please inform a valid email</p>
+</script>
<div>
  <div class="container" style="margin-top: 30px">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><strong>Sign in </strong></h3>
```

Y ahora sustituimos en el campo usuario por la plantilla y en el campo clave directamente usamos la plantilla:

_./src/app/pages/login/login.component.html_

```diff
    <input
      name="loginField"
      type="email"
      class="form-control"
      style="border-radius: 0px"
      id="exampleInputEmail1"
      placeholder="Enter email"
      ng-model="vm.user"
      ng-required="true"
    />
-    <div ng-messages="loginForm.loginField.$error">
-      <p ng-message="required">Please inform the field</p>
-      <p ng-message="email">Please inform a valid email</p>
-    </div>
+  <div ng-messages="loginForm.loginField.$error">
+    <div ng-messages-include="form-error-messages">
+    </div>
+  </div>
```

Y en el campo clave podemos hacer lo mismo:

_./src/app/pages/login/login.component.html_

```diff
    <input
+     name="passwordField"
      type="password"
      class="form-control"
      style="border-radius: 0px"
      id="exampleInputPassword1"
      placeholder="Password"
      ng-model="vm.password"
      ng-required="true"
    />
+  <div ng-messages="loginForm.passwordField.$error">
+    <div ng-messages-include="form-error-messages">
+    </div>
+  </div>
```

¿Y que pasa si tengo que cambiar uno de los mensajes de error de la plantilla justo sólo para un campo? ¿Tengo que manualmente poner todos los validadores? La respuesta es no, puedes elegir la plantilla y sobrescribir el texto del validador que quiera, vamos a cambiar el mensaje de required para el campo de la contraseña a otro texto:

```diff
              <input
                name="passwordField"
                type="password"
                class="form-control"
                style="border-radius: 0px"
                id="exampleInputPassword1"
                placeholder="Password"
                ng-model="vm.password"
                ng-required="true"
              />
              <div ng-messages="loginForm.passwordField.$error">
+                 <div ng-message="required">Empty password is not allowed</div>
                <div ng-messages-include="form-error-messages"></div>
              </div>
```

Fíjate que ahora para la validación _ng-required_ en el campo username tenemos el estandár _Please inform the field_ y para el campo de la contraseña tenemos el mensaje _Empty password is not allowed_.

_Angularjs_ trae una serie de validaciones predefinidas, por ejemplo:

- ng-required: campo obligatorio.
- ng-minlength: el campo debe tener una longitud mínima.
- ng-maxlength: el campo no puede pasar de una longitud máxima.
- ng-pattern: el campo tiene que cumplir el patrón que le indiquemos en una expresión regular.

Además de esto existen multitud de validadores de terceros, uno interesante, un [validador de IBAN](https://github.com/ayosdev/ng-iban-custom)

También puedes crear tus [propias validaciones síncronas y asíncronas](https://www.algotech.solutions/blog/javascript/how-to-create-custom-validator-directives-with-angularjs/)
