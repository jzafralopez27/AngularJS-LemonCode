# 00 Proyecto de arranque

Vamos a analizar el proyecto con el que arrancamos y cómo se organiza.

# Como arrancarlo

Esta es la primera duda que te surgirá.

Lo primero que vamos a hacer es instalar las dependencias, en un proyecto medianamente moderno lo harías ejecutando el siguiente comando:

```bash
npm install
```

Depende del proyecto AngularJS en el que estés trabajando, te puedes encontrar con que:

- Los ficheros JS se importan directamente con un script en el HTML.
- O se use Bower o incluso Nuget para descargas las dependencias.

Aquí mi consejo es que le preguntes al responsable del proyecto cuando arranques.

Para arrancar la aplicación, ejecuta:

```bash
npm start
```

Lo mismo aquí puede que el proyecto en el que has caído esté usando una tecnología más antigua y lo tengas que arrancar directamente desde un IDE (por ejemplo Visual Studio), o con algún comando específico (grunt/gulp).

Cuando arrancas el proyecto este levanta un servidor ligero en el puerto 8080 (si ese puerto está ocupado, te lo dirá en la consola, y aquí puedes elegir si cambiar el puerto tocando el _webpack.config.js_ o si paras el proceso que lo esté ocupando para poder levantar la aplicación).

Al navegar a localhost:8080 verás que parece el siguiente texto.

```
Hello From Angular app!
```

# Estructura del proyecto

## Primer nivel

En el primero nivel tenemos los siguientes ficheros y carpetas principales:

```
├───node_modules
├───src
├───package-lock.json
├───package.json
├───tsconfig.json
└───webpack.config.js
```

Veamos que es cada una de ellas:

- **node_modules**: cuando hacemos _npm install_ aquí se bajan todas las dependencias del proyecto, esta carpeta NUNCA la subiremos al repositorio (porque es muy pesada y no tiene sentido que la subamos), además esto se puede regenerar haciendo un _npm install_

- La raíz del proyecto se suele reservar para _fontanería_ (configuración de typescript, de bundling, package.json...), y en _src_ es cuando empezamos a hablar de código.

  - **package.json**: este fichero es el que contiene la información del proyecto: el nombre, la versión, las dependencias, etc, aquí encontrarás definición de comandos como _npm start_
  
  - **package-lock.json**: este fichero se genera automáticamente cuando hacemos _npm install_ y es un fichero que se usa para asegurar que las dependencias que se instalan son las mismas en todos los equipos que trabajen con esta solución.

  - **tsconfig.json**: este fichero es el que contiene la configuración de TypeScript, aquí se definen cosas como  si vas a trabajar en modo estrictito, si se compila a ES5 o ES6, etc.

  - **webpack.config.js**: este fichero es el que contiene la configuración de Webpack, aquí se definen cosas como el puerto en el que se levanta el servidor, el punto de entrada de la aplicación, etc., es decir tu configuración de bundling.

## SRC

En la carpeta src tenemos la siguiente estructura:

```
├───app
├───index.html
└───mystyles.css
```

- **app**: aquí es donde vamos a empezar a desarrollar con _angular_ y _typescript_.

- **mystyles.css**: en este fichero incluimos estilos globales (aquí depende mucho de cómo esté montado tu proyecto estará de una forma u otra).

- **index.html**: este es el fichero que se va a servir cuando arranquemos el proyecto, si trabajamos con aproximación SPA, será el único HTML completo que se cargue en el navegador (el resto serán fragmentos), vamos a analizar esto un poco más en profundidad.

## Index.html

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Angular 1.X Sample App</title>
  </head>
  <body ng-app="app" ng-strict-di ng-cloak>
    <app> ...Loading </app>
  </body>
</html>
```

¿Qué hacemos aquí? Si te fijas todo parece un HTML estándar, salvo cuando llegas al _body_ y ahí aparecen unos atributos raros:

```html
<body ng-app="app" ng-strict-di ng-cloak></body>
```

Esos atributos _raros_ se llaman _directivas_ y dotan de superpoderes a un elemento de HTML (le enseñan trucos nuevos), en este caso:

- **ng-app**: es la directiva que le dice a Angular que este elemento es el elemento raíz de la aplicación.

- **ng-strict-di**: es la directiva que le dice a Angular que use la inyección de dependencias en modo estricto (esto es un tema que vamos a ver más adelante, pero para hacerte una idea, te permite detectar problemas en tu bundle en producción si has puesto mal una entrada).

- **ng-cloak**: es la directiva que le dice a Angular que no muestre el contenido del elemento hasta que no esté listo.

En tu proyecto seguramente encuentres **ng-app**, las otras dos puede que no.

Si vienes de HTML antiguo, te darás cuenta de que aquí no hay ningún tag script que cargue un fichero JS, esto es porque en este proyecto estamos usando Webpack, y Webpack se encarga de cargar todos los ficheros JS que necesitamos.

## Carpeta App

Aquí tenemos los siguientes ficheros:

```
├───app.component.ts
├───app.html
├───app.ts
```

- **app.ts**: Punto de entrada de la aplicación, aquí le indicamos que vamos a crear un módulo que se va a llamar _app_ sus dependencias (por ejemplo podemos importar el módulo de enrutación o una librería de componentes, que previamente hemos instalado con _npm install_), y el cual va a ser el componente de arranque de la aplicación (en este caso lo hemos llamado _app_, en la siguiente línea verás este componente definido).

- **app.html**: Aquí definimos el _HTML (UI) del componente app_ en este caso ponemos el texto de _hola mundo_ (ya lo ampliaremos).

- **app.component.ts**: aquí definimos la lógica en TypeScript del componente _app_, de momento hacemos algo muy simple:
  - Definimos un objeto.
  - Le indicamos que su plantilla es _app.html_.

En los siguientes ejemplos nos meteremos en escenarios más complejos con componentes.
