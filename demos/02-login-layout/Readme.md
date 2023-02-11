# 01 Login Layout

Antes de ponernos a crear servicios o ponernos con bindings etc, lo suyo es construir un layout que tenga buena pinta.

En los tiempos es que se usaba Angular teníamos una seríe de problemas para poder hacer un layout que se ajustara a la pantalla, y que tuviera un buen aspecto:

- Los estándares como flexbox o css grid no estaban del todo definidos.
- Cada navegador hacía la guerra por su sitio (al cabezota de Microsoft le coste dió su brazo a torcer a con Internet Explorer).
- Estaban irrumpiendo las tablets, los smart phones y hacer aplicaciones responsivas se hacía muy complicado (en muchos casos se llegaban a mantener portales separados para móvil o escritorio).

En ese tiempo se publicaron librerías como _Twitter bootstrap_ que ayudaban a construir layouts responsivos, si estás en un proyecto legacy es muy probable que estás usando _bootstrap_, a tener en cuenta:

- Si tu proyecto es muy antiguo, seguramente estés usando la versión 2 de Bootstrap (ojo, buscate la documentación de esta versión ya que hay bastantes cambios con la versión 3).
- Si tu proyecto se creo en 2015 o 2016 puede que estás trabajando con la versión 3 de Bootstrap.
- Si es más moderno o actualizado puede que esté con la 4 o incluso la 5.

Ojo cada versión introduce breaking changes, y existen librerías de componentes de Angular que están atadas a ciertas versiones de Bootstrap, antes de intentar migrar o actualizar pregunta al responsable de tu proyecto.

# Paso a paso

En este proyecto ya tenemos _bootstrap_ versión _3.3.7_ instalado, como curiosidad, si quieres instalar un paquete instalado con una versión concreta, se lo puedes indicar en el _npm install_:

```bash
npm install bootstrap@3.3.7 --save
```

En el proyecto también te encontrarás que referenciamos el CSS de esta librería en el fichero _webpack.config.js_.

Si necesitas consultar como funciona esta librería, tienes la documentación disponible en este enlace:

https://bootstrapdocs.com/v3.3.0/docs/css/

Vamos a plantar un layout completo de login, ver el aspecto que tiene y explicar un poco como funciona:

_./src/_

```diff
<div>
-  <h1>Hello From Login Component !</h1>
+  <div class="container" style="margin-top:30px">
+    <div class="col-md-4 col-md-offset-4">
+      <div class="panel panel-default">
+        <div class="panel-heading">
+          <h3 class="panel-title"><strong>Sign in </strong></h3>
+        </div>
+        <div class="panel-body">
+          <form role="form">
+            <div class="form-group">
+              <label for="exampleInputEmail1">Username or Email</label>
+              <input
+                type="email"
+                class="form-control"
+                style="border-radius:0px"
+                id="exampleInputEmail1"
+                placeholder="Enter email"
+              />
+            </div>
+            <div class="form-group">
+              <label for="exampleInputPassword1"
+                >Password
+                <a href="/sessions/forgot_password">(forgot password)</a></label
+              >
+              <input
+                type="password"
+                class="form-control"
+                style="border-radius:0px"
+                id="exampleInputPassword1"
+                placeholder="Password"
+              />
+            </div>
+            <button type="submit" class="btn btn-sm btn-default">
+              Sign in
+            </button>
+          </form>
+        </div>
+      </div>
+    </div>
+  </div>
   <a ui-sref="clientlist">Navigate to clients</a>
</div>
```

-Vamos a arrancar el proyecto y ver que pinta tiene el login:

- _container_: es un elemento que nos permite centrar el contenido de la página, y que se ajuste a la pantalla.
- _col-md-4 col-md-offset-4_: es un elemento que nos permite crear columnas, y que se ajuste a la pantalla, en este caso el estamos diciendo que para tamaño de pantalla _md_ (medium) queremos que ocupe 4 columnas, y que se desplace 4 columnas a la derecha (bootstrap tiene su sistema de diseño en columnas, así como diferente tamaños, xs, sm, md, lg, xl).
- _panel_: es un elemento que nos permite crear un panel con un borde, y que se ajuste a la pantalla.
- _panel-heading_: es un elemento que nos permite crear un encabezado para el panel.
- _panel-body_: es un elemento que nos permite crear un cuerpo para el panel.
- _form_: es un elemento que nos permite crear un formulario.
- _form-group_: es un elemento que nos permite crear un grupo de elementos de un formulario.
- _btn_: bootstrap nos permite estilar botones.

Si necesitas inspiración para crear un formulario o listado estilado y estás en un proyecto legacy, mi consejo es que busques ejemplos parecidos en la aplicación para poder tomarlo como punto de partida, si tienes que hacer algo nuevo puedes también inspirarte en los ejempls de _bootsnipp_ soporta varias versiones, en concreto para esta versión 3.3: https://bootsnipp.com/tags/3.3.0

Otro tema a la hora de crear layout es que preguntes en tu equipo que aproximación se usa, puede que igual para nuevas ventanas prefieres que los montes usando tecnología moderna, o puede que por consistencia prefieran que uses lo que se usa en el resto de la aplicación.
