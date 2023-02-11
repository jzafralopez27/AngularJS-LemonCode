# 04 Servicios

En Angularjs, los servicios son objetos que se encargan de realizar tareas específicas, como por ejemplo, comunicarse con un servidor, o realizar cálculos matemáticos.

Utilizando servicios evitamos poner lógica en los controladores /componentes, y así, mantenerlos lo más limpios posibles.

Los servicios se definen en un fichero aparte, y se inyectan en los controladores /componentes (hola inyección de dependencias).

Otro tema muy interesante es que en AngularJS los servicios siempre son singleton, es decir sólo hay una instancia de cada servicio para toda la aplicación (acuérdate de que en Angular 2+ puedes elegir si quieres que sea singleton o no).

En este ejemplo vamos a crear un servicio que simule la validación de un login, lo haremos tanto en sabor síncrono, coo asíncrono (simulando la llamada a un servidor).

# Paso a paso

- Partimos del ejemplo anterior, como siempre, copiamos el contenido y hacemos un:

_npm install_

- Vamos ahora a ver donde colocar los servicios:

  - En proyectos antiguos te puedes encontrar con una carpeta que se llama _services_ donde sueltas todos los servicios de la aplicación, esto está bien para proyectos pequeños, si un proyecto crece mucho, se puede convertir en un infierno encontrar un servicio o saber a en que ventanas se usaba o si es común (si estás en este caso, lo mejor que puedes hacer es aprender a buscar fichero en el arbol de visual studio code, es muy útil).

  - En proyectos más modernos lo normal es tener lo servicios relacionados con una ventana / componente en la misma carpeta, y los que se usen en varios en una carpeta _common_ (o como quieras llamarla), de esta manera creas islas de funcionalidad y el proyecto es más manejable.

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
+    return (user === 'admin' && pwd === 'test');
  }
```

Bueno, esto podríamos engancharlo desde la página (previo registro del servicio a nivel de módulo), pero queremos simular una llamada asíncrona, aquí viene un tema interesante:

- Cuando Angularjs se publicó en tema de las promesas y temas tales como _async/await_ o bien no existía, o habían navegadores que no lo soportaban.
- El equipo de _angularjs_ fusiló una librería que se llamaba _q_ que era una implementación de promesas, y la incluyó en el core de angularjs.

Así que en proyectos _angularjs_ es muy normal que te encuentras con _$q_ por todos sitios :).

Vamos a ver como simular que estamos haciendo una llámada asíncrona en el método _validateLogin_.

- Primero tenemos que pedir $q a angularjs, para ello tenemos que inyectarlo en el constructor del servicio.

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

- Le pedimos a angularJS que cuando se instancie el servicio de login busque al servicio $q (viene incluído en AngularJS) y nos lo asignen a la variable miembro  _$q\_.

- Para evitar problemas cuando minifiquemos el código, utilizamos la anotación para indicarle que busque el servicio $q (ojo depende de la versión de angular y aproximación, esto te lo puedes encontrar resuelto de varias formas).

- Vamos ahora a cambiar la implementación del método _validateLogin_ para que devuelva una promesa.
