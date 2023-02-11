# 07 Lista de clientes tirando de rest api

Vamos ahora a interactuar con una rest api, traernos datos y mostrarlos por pantalla.

# Paso a paso

- Partimos del ejemplo anterior, como siempre, copiamos el contenido y hacemos un:

```bash
npm install
```

- Esta vez vamos a abrir un terminal adicional y en el propio repositorio tenemos un servidor rest api mock, para arrancarlo:

```bash
cd server
```

```bash
npm start
```

Dejalo corriendo, para probbar que funciona pon la siguente url en el navegador: [http://localhost:3000/api/clients](http://localhost:3000/api/clients)

- Vámonos ahora al código de angular, volvemos a la página de listado de clientes.

- Cómo estamos usando TypeScript, vamos a crear una entidad que represente a un cliente, para ello creamos un fichero model.ts:

_./src/app/pages/client-list/client-list.model.ts_

```typescript
export interface Client {
  id: string;
  name: string;
  status: string;
}
```

- Vamos ahora a crear un servicio que se encargue de traernos los datos de la rest api, para ello creamos un fichero client.service.ts:

_./src/app/pages/client-list/client.service.ts_

```typescript
import * as angular from "angular";
import { Client } from "./client-list.model";

export class ClientApiService {
  constructor() {}
}
```

- Para poder hacer peticiones http, vamos a usar el servicio HttpClient de Angular, además de esto procesaremos la respuesta para dejarlo tipado como un array de Client, para ello usaremos el gestor de promesas de Angular _$q_.

> Fíjate que aquí para _$q_ no hemos definido una variable miembro como _$http_ directamente le hemos plantado el _private_ en el constructor, esto es un azucar de TypeScript que nos permite definir una variable miembro y asignarle el valor de un parámetro del constructor.

_./src/app/pages/client-list/client.service.ts_

```diff
import * as angular from 'angular';
import { Client } from "./model/client";


export class ClientApiService {
+  $http: angular.IHttpService = null;
-  constructor() {}
+  constructor($http: angular.IHttpService, private $q : angular.IQService) {
+    "ngInject";
+   this.$http = $http;
+ }
}
+
+ ClientApiService.$inject = ['$http','$q'];
```

- Vamos a registrarlo en el app:

_./src/app/app.ts_

```diff
import { ClientListResultComponent } from "./pages/client-list/result/client-list-result.component";
import { ClientListCardComponent } from "./pages/client-list/card/client-list-card.component";
import { LoginService } from "./pages/login/login.service";
+ import { ClientApiService } from "./pages/client-list/client.service";

angular
  .module("app", ["ui.router", "ngMessages", "toastr"])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent)
  .component("clientlist", ClientListComponent)
  .component("clientlistsearch", ClientListSearchComponent)
  .component("clientlistresult", ClientListResultComponent)
  .component("clientlistcard", ClientListCardComponent)
  .service("LoginService", LoginService)
+  .service("ClientApiService", ClientApiService);
```

Vamos a crear un método que nos traiga los clientes, para ello vamos a usar el método _get_ de _$http_, aquí:

- Creamos una promesa.
- Lanzamos la llamada HTTP (si no tratáramos la respuesta, podríamos directamente devolver la promesa de _$http_).
- En cuanto llega la respuesta lo tipamos a nuestro array de clientes.

_./src/app/pages/client-list/client.service.ts_

```diff
  constructor($http: angular.IHttpService, private $q : angular.IQService) {
    "ngInject";

    this.$http = $http;
  }

+  public getClientList(): angular.IPromise<Client[]> {
+    const deferred = this.$q.defer<Client[]>();
+
+    // TODO This could be configured, baseURL and environment variable in webpack
+    this.$http.get('http://localhost:3000/clients').then(
+      (result) => {
+        const clients =  result.data as Client[];
+        deferred.resolve(clients);
+      }
+    );
+    return deferred.promise;
+  }
```

- Vamos a registrar el servicio en nuestra aplicación:

_./src/app/app.ts_

```diff
import * as angular from "angular";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { LoginComponent } from "./pages/login/login.component";
import { ClientListComponent } from "./pages/client-list/client-list.component";
import { ClientListSearchComponent } from "./pages/client-list/search/client-list-search.component";
import { ClientListResultComponent } from "./pages/client-list/result/client-list-result.component";
import { ClientListCardComponent } from "./pages/client-list/card/client-list-card.component";
import { LoginService } from "./pages/login/login.service";
+ import { ClientApiService } from "./pages/client-list/client.service";

angular
  .module("app", ["ui.router", "ngMessages", "toastr"])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent)
  .component("clientlist", ClientListComponent)
  .component("clientlistsearch", ClientListSearchComponent)
  .component("clientlistresult", ClientListResultComponent)
  .component("clientlistcard", ClientListCardComponent)
  .service("LoginService", LoginService)
+  .service("ClientApiService", ClientApiService);
```

- Vámonos ahora a nuestra página de clientes y creamos un _controller_ y traernos el servicio de _clienteAPIService_ lo asignamos a la página (vamos a usar el azucar de TS para definir la variable miembro y asignarle el valor del parámetro del constructor).

_./src/app/pages/client-list/client-list.component.ts_

```diff
+ import { ClientApiService } from "./client.service";

+ class ClientListController {
+  constructor(private clientApiService: ClientApiService) {
+  "ngInject";
+  }
+ }

export const ClientListComponent = {
  template: require("./client-list.component.html") as string,
+ controller: ClientListController,
+ controllerAs: "vm"
};

+ ClientListController.$inject = ['ClientApiService'];
```

- Queremos cargar los datos justo cuando se carga la página, para ellos vamos a usar _$OnInit_ (como vimos en ejemplos anteriores este método se ejecuta justo después del constructor cuando ya está monntado el componente en el dom):

_./src/app/pages/client-list/client-list.component.ts_

```diff
import { ClientApiService } from "./client.service";

class ClientListController {
  constructor(private clientApiService: ClientApiService) {
    "ngInject";
  }

+ $onInit() {
+   this.clientApiService.getClientList().then(
+     (result) => {
+       console.log(result);
+     }
}
```

- Vamos comprobar que al cargar la página salen los datos por la consola
