# 01 Routing

En el paso previo, hemos cread una aplicación con un sólo componente, pero en una aplicación real, queremos tener varias ventanas y navegación, ojo:

- En realidad sólo tenemos un HTML completo de base.
- En un _div_ de ese HTML tendremos componentes que dinámicamente se irán cargando y reemplazando el contenido.

Para ello nos hace falta:

- Definir los componentes que queremos mostrar.
- Utilizar un enrutador que permita navegar entre ellos.

# Paso a paso

Antes de empezar a configurar el routing, vamos a crear un componente de _login_ que vamos a usar en la página de inicio.

Vamos a crear una subcarpeta que llamaremos _pages_ y dentro crearemos otra subcarpeta que llamaremos _login_ y dentro de esta crearemos un fichero _login.component.ts_ y otro _login.component.html_.

_./src/app/pages/login/login.component.html_

```html
<div>
  <h1>Hello From Login Component !</h1>
</div>
```

_./src/app/pages/login/login.component.ts_

```typescript
export const LoginComponent = {
  template: require("./login.component.html") as string,
};
```

Este componente de login lo registraremos a nivel de aplicación.

_./src/app/app.ts_

```diff
import * as angular from "angular";
import { AppComponent } from "./app.component";

angular.module("app", ["ui.router"])
  .component("app", AppComponent)
+ .component("login", LoginComponent);
```

En _Angularjs_ os podéis encontrar dos opciones principales de routing:

- _angular-router_: este es el router oficial de _Angularjs_, es un módulo externo, y es tiene algunas limitaciones.
- _ui-router_: este fue un router alternativo, que tiene más funcionalidades, y en los últimos años de esta tecnología se hizo bastante popular.

Lo normal es que si no tenéis casos avanzados en vuestra aplicación, ambos funcionen de una manera similar y os cubra un mínimo.

En este ejemplo vamos a usar _uirouter_.

Lo primero que hacemos es instalarnos el módulo, si vuestro proyecto utiliza _npm_ sería:

```bash
npm install @uirouter/angularjs --save
```

- Ahora toca incluir la librería en nuestro bundle, en caso de que estés usando _webpack_, lo podemos añadir en nuestro punto de entrada (otra opción más arcaica es añadir el script en el _index.html_, en un proyecto real pregunta a tu mentor si tienes dudas):

> En el fichero del proyecto verás que ya están incluidos por comodidad

_webpack.config.js_

```diff
  entry: {
    app: './app/app.ts',
    vendor: [
      'angular',
+      '@uirouter/angularjs',
    ],
```

- Nos hemos descargado la librería y la hemos incluido en nuestro bundle, pero nos queda un paso más para poder usarla, y es indicarle a _Angularjs_ que la incluye en el proyecto:

En nuestra aplicación _angular_ suele haber un punto de entrada que se suele llamar _app_ o _main_ en el que definimos un módulo, el nombre del mismo (normalmente _app_, aunque puede tener el nombre de otra aplicación) y las dependencias que tiene (es decir que librerías va a usar), así como que componentes de aplicación tiene registrado (veremos esto en más detalle más adelante).

_./src/app/app.ts_

```diff
import * as angular from 'angular';
import {AppComponent} from './app.component';
import { components } from './components'

angular.module('app', [
+   'ui.router',
    components.name
  ])
  .component('app', AppComponent)
;
```

> Mucho cuidado con no equivocarte al teclear el nombre de la librería aquí, fíjate que es un string, y que si te equivocas _typescript_ no te va a avisar.

> Hay aplicaciones que definen varios módulos para que ésta sea más mantenible, en caso de duda pedid ayuda a vuestro mentor.

Vamos ahora a crear un fichero en el que definiremos las rutas de nuestra aplicación, que hacemos aquí:

A nivel de imports

- Primero importamos el módulo de _angularjs_ (usaremos algunas entradas del mismo en este fichero).
- Después importamos el módulo de _uirouter_, y nos traemos una serie de entradas (_StateProvider_, _UrlRouteProvider_ y _Ng1StateDeclaration_).

A nivel de código:

- Definimos una función en la que pedimos una serie de servicios, aquí estamos usando inyección de dependencia (es parecido a lo que hacíamos con _@Inject_ en _Angularjs_).

- Fíjate que por defecto, _Angularjs_ cuando vaya a buscar esas dependencias lo hará por el nombre de la variable, esto puede ser un problema serio cuando hagamos el build a producción y estos nombres se minifiquen, por eso usamos una extensión en la que le indicamos los nombres de los servicioes que queremos inyectar (fíjate que al final del fichero tienes una entrada _routing.$inject_, depende de la versión de _angularjs_ con la que estés trabajando esto se resuelve de diferentes maneras, pregunta a tu responsable de proyecto).

- Lo siguiente que hacemos es indicarle que vamos a usar url's antiguas (con #), esto es para que no se rompa la navegación en navegadores antiguos, si lo pones en modo _html5_ no pones la _#_ para las rutas.

- Después empezamos a definir las rutas de nuestra aplicación, aquí tenemos un _$stateProvider_ y definimos una ruta _home_, en esta ruta vamos a definir una página que contendrá un componente de _login_ (el que hemos creado y registrado en un paso previo).

> El areas de _views_ está definida de esta manera porque podemos tener más de un placeholder en la página, y cada uno de ellos puede tener una ruta diferente (es para escenario más complejos).

_./src/app/app.routing.ts_

```typescript
import * as angular from "angular";
import {
  StateProvider,
  UrlRouterProvider,
  Ng1StateDeclaration,
} from "@uirouter/angularjs";

// https://github.com/ngParty/ng-metadata/issues/206
export const routing = (
  $locationProvider: angular.ILocationProvider,
  $stateProvider: StateProvider,
  $urlRouterProvider: UrlRouterProvider
) => {
  "ngInject";

  // html5 removes the need for # in URL
  $locationProvider.html5Mode({
    enabled: false,
  });

  $stateProvider.state("home", <Ng1StateDeclaration>{
    url: "/home",
    views: {
      "content@": { template: "<login></login>" },
    },
  });

  $urlRouterProvider.otherwise("/home");
};

routing.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
```

- Vamos a decirle a la aplicación angular que vamos a usar ese _routing_ que hemos definido, para ello usamos el método _config_ del módulo de _angularjs_.

_./src/app/app.ts_

```diff
import * as angular from "angular";
import { AppComponent } from "./app.component";
+ import { routing } from "./app.routing";
import { LoginComponent } from "./pages/login/login.component";

angular.module("app", ["ui.router"])
+ .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent);
```

Ahora vamos al fichero de _app.html_ y le indicamos que vamos a usar el outlet de _uirouter_ (es decir en ese sitio es donde ui-router mostrará la página), fijate que es un div en el que le índicamos que pinte el contenido del area de _ui-router_ que nombramos _content_ (sólo nombramos una).

_./src/app/app.html_

```diff
<div>
  <h1>Hello From Angular app!</h1>
+ <div ui-view="content"></div>
</div>
```

- Es el momento de arrancar y ver que se nos muestra la página de login.

```bash
npm start
```

- Bueno, contentos porque con todo el bombazo de código que hemos metido, sigue funcionando la aplicación, pero es hora de empezar a sacarle partido al router, vamos a crear una página en la que vamos a mostrar un listado de clientes, y añadir un enlace de navegación para ir de una página a otra.

_./src/pages/client-list/client-list.component.html_

```html
<div>
  <h1>Hello From Client Component !</h1>
</div>
```

_./src/pages/client-list/client-list.component.ts_

```typescript
export const ClientListComponent = {
  template: require("./client-list.component.html") as string,
};
```

Para utilizar esta nuevo página tenemos que registrarla, en este caso lo hacemos en el módulo de _aplicación_ en una aplicación grande puede que la tengan parcelada en diferentes submódulos, si tienes dudas pregunta al responsable de tu proyecto.

_./src/app/app.ts_

```diff
import * as angular from "angular";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { LoginComponent } from "./pages/login/login.component";
+ import { ClientListComponent } from "./pages/client-list/client-list.component";

angular
  .module("app", ["ui.router"])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent)
+ .component("clientlist", ClientListComponent);
```

Vamos a añadir esta ruta a nuestro _ui-router_.

_./src/app/app.routing.ts_

```diff
  $stateProvider.state("home", <Ng1StateDeclaration>{
    url: "/home",
    views: {
      "content@": { template: "<login></login>" },
    },
  })
+ .state("clientlist", <Ng1StateDeclaration>{
+   url: "/clientlist",
+   views: {
+     "content@": { template: "<clientlist></clientlist>" },
+   },
+ });
  ;
```

- Si ahora probamos en el navegador, podemos introducir en el navegador la siguiente ruta _http://localhost:8080/#/clientlist_ y veremos que se nos muestra la página de clientes.

- Es hora de poder navegar también en la aplicación, vamos a añadir 8n enlace para navegar a la página de clientes desde la página de login.

_./src/pages/login/login.component.html_

```diff
<div>
  <h1>Hello From Login Component !</h1>
+  <a ui-sref="clientlist">Navigate to clients</a>
</div>
```

Fíjate que no estamos usando _href_ para navegar ¿Por qué? Si usaramos el parámetro _href_ navegaría a un página estática, y perderíamos la navegación de _ui-router_.

Aquí lo que usamos es una directiva (le enseñamos _trucos_ nuevos al viejo elemento _a_): en este caso _ui-sref_ que nos permite navegar a una ruta de _ui-router_.

Vamos a probarlo

```bash
npm start
```

Si pinchamos en el enlace puede ver que navegas a la página de clientes.
