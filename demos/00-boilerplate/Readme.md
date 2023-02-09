# 00 Proyecto de arranque

Vamos a analizar el proyecto con el que arrancamos y como se organiza.

# Como arrancarlo

Esta es la primera duda que te surgirá.

Lo primero que vamos a hacer es instalar las dependencias, en un proyecto medianamente moderno lo harías ejecutando el siguiente comando:

```bash
npm install
```

Depende del proyecto legacy en el que estés trabajando, te puedes encontrar con que:

- Los ficheros JS se importan directamente con un script en el HTML.
- Se use Bower o incluso Nuget para descargas las dependencias.

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

## Steps to run it

- First you need to install all the depdencies, open your command prompt and execute an _npm install_.

```bash
npm install
```

- Now let's start our fake server:

```bash
npm run api:fake
```

- And let's start our web application:

```bash
npm start
```
