---


---

<h1 id="pia---aplicaciones-móviles">PIA - Aplicaciones Móviles</h1>
<h2 id="portada">Portada</h2>
<h4 id="universidad-autónoma-de-nuevo-león">Universidad Autónoma de Nuevo León</h4>
<h4 id="facultad-de-ciencias-físico-matemáticas">Facultad de Ciencias Físico Matemáticas</h4>
<h4 id="semestre-febrero-junio2021">Semestre Febrero-Junio2021</h4>
<p><strong>Maestro:</strong> Lic. Arturo Gabriel García Fernández<br>
<strong>Numero de Equipo:</strong> 10<br>
<strong>Integrantes:</strong></p>
<blockquote>
<p>Hector Daniel Martinez Oviedo <strong>#1842904</strong><br>
Oscar Daniel Magaña Zepeda <strong>#1901614</strong></p>
</blockquote>
<h2 id="introduccion">Introduccion</h2>
<p>Nuestra aplicación se trata de una aplicación de para agregar notas, listas de pendientes y eventos, con el plus de que se agrega un log in por medio de correo electrónico, para que en un mismo dispositivo se pueda guardar información de diferentes usuarios.</p>
<h2 id="menú">Menú</h2>
<p>Toda la aplicación esta manejada con un slide Menú con las siguientes opciones:</p>
<blockquote>
<p><strong>Inicio</strong><br>
Routing a la pagina inicio<br>
<strong>Calendario</strong><br>
Routing a la pagina Calendario (home)<br>
<strong>Notas</strong><br>
Routing a la pagina Notas<br>
<strong>Salir</strong><br>
Redirecciona a la pagina del login cerrando la sesión del usuario activo.</p>
</blockquote>
<h2 id="paginas">Paginas</h2>
<h3 id="login">LogIn</h3>
<p>La pagina de Login es muy sencilla, muestra los campos validados para un formato valido de correo electronico y uno aceptable para la contraseña.Todo esto realizado y validado mediante la API Authentication de firebase. Esta pagina aparte de los dos campos de input cuenta con dos botones en swuitch, cuando es un inicio de sesión se muestran los botones</p>
<blockquote>
<p><strong>Entrar</strong><br>
Este botón es para en caso de que los input ya tengan información valida, se inicie sesión, y se hace route a la pagina de inicio(inicio.page)<br>
<strong>Registrarse</strong><br>
Se hace switch y se va cambia a un registro en ves de un inicio de sesión.</p>
</blockquote>
<p>Cuando se es un registro se muestran los botones:</p>
<blockquote>
<p><strong>Guardar</strong><br>
Este botón es para en caso de que los input ya tengan información valida, se inicie sesión<br>
<strong>Iniciar Sesión</strong><br>
Se hace switch y se va cambia a un inicio de sesión en ves de un registro.</p>
</blockquote>
<h3 id="pagina-de-inicio-inicio">Pagina de inicio (inicio)</h3>
<p>Esta pagina tiene la función de agregar y eliminar pequeñas item’s que en contexto son pendientes por hacer, por ser un extra y algo un poco mas rápido y practico, solo esta la funcionalidad de eliminar, aparte de la principal que es marcarlas como realizadas.</p>
<h3 id="pagina-de-calendario-home">Pagina de calendario (home)</h3>
<p>Esta pagina aparece vacía en caso de no tener ningún evento agregado, en caso de tener eventos guardados se desplegaran en forma de lista, y al momento de deslizar estos eventos hacia la derecha aparecerán dos iconos, uno de un bote de basura que activa un método de Borrar Evento, y otro de un libro y un lápiz que es para el método de Editar Evento.<br>
En la parte superior derecha, aparece un icono de + que sirve para agregar eventos(pagina input evento)</p>
<h4 id="pagina-input-evento">Pagina input evento</h4>
<p>En esta pagina se carga un formulario de fecha, titulo y descripción, aparte de un botón que dice ingresar que esta deshabilitado hasta que el formulario tenga el formato correcto y este lleno.</p>
<h4 id="pagina-editar-evento">Pagina editar evento</h4>
<p>En esta pagina se manda el id del evento seleccionado en la pagina home, y se cargan un formulario de fecha, titulo y descripción, con placeholder’s los datos del evento preseleccionado, aparte de un botón que dice actualizar que esta deshabilitado hasta que el formulario tenga el formato correcto y este lleno.</p>
<blockquote>
<h5 id="borrar-evento">Borrar Evento</h5>
<p>Borra el evento en el arreglo, y automáticamente actualiza la memoria (se carga el arreglo)</p>
<h5 id="editar-evento">Editar Evento</h5>
<p>Se obtiene el id del evento, y se manda como parámetro a una pagina de editar evento (routing)</p>
</blockquote>
<h3 id="pagina-de-notas">Pagina de notas</h3>
<p>Esta pagina aparece vacía en caso de no tener ninguna nota agregada, en caso de tener notas guardadas se desplegaran en forma de lista, y al momento de deslizar estos eventos hacia la derecha aparecerán dos iconos, uno de un bote de basura que activa un método de Borrar Nota, y otro de un libro y un lápiz que es para el método de Editar Nota.<br>
En la parte superior derecha, aparecen dos iconos, el primero de izquierda a derecha es de una galería que te direcciona a la pagina de Notas rápidas(tab2), y a un lado aparece un icono de + que sirve para agregar eventos(pagina input evento).</p>
<h4 id="pagina-input-nota">Pagina input nota</h4>
<p>En esta pagina se carga un formulario titulo y descripción, aparte de un botón que dice ingresar que esta deshabilitado hasta que el formulario tenga el formato correcto y este lleno, para actualizar y cargar el arreglo a la memoria.</p>
<h4 id="pagina-editar-nota">Pagina editar nota</h4>
<p>En esta pagina se manda el id de la nota seleccionada en la pagina notas, y se cargan un formulario de titulo y descripción, con placeholder’s los datos de la nota preseleccionada, aparte de un botón que dice actualizar que esta deshabilitado hasta que el formulario tenga el formato correcto y este lleno, para actualizar y cargar el arreglo a la memoria.</p>
<blockquote>
<h5 id="borrar-nota">Borrar Nota</h5>
<p>Borra la nota en el arreglo, y automáticamente actualiza la memoria (se carga el arreglo)</p>
<h5 id="editar-nota">Editar Nota</h5>
<p>Se obtiene el id de la nota, y se manda como parámetro a una pagina de editar nota (routing)</p>
</blockquote>
<h4 id="pagina-notas-rápidas">Pagina Notas Rápidas</h4>
<p>En esta pagina aparecen desplegadas todas las notas rapidas del usuario que en este caso son fotos, que se agregan con un tab de Camara en la parte inferior de la pagina que abre la camara, y al momento de tomarla te confirma si guardarla o no.<br>
En la lista de fotos, al momento de seleccionar alguna, te da la opción de eliminarla o cancelar la acción.</p>

