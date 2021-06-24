function obtenerAjax() {
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest(); //Verifica si no es el internet explorer (opera, brave, chrome)
  } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP"); //Es internet explorer
  }
  return xhttp;
}
var ajax = obtenerAjax();

//Cargando la pagina principal
window.onload = function () {
  cargarPlantilla("view/start.html");
};

//Cargar Inicio
function cargarPlantilla(plantilla) {
  ajax.open("GET", plantilla, true);
  ajax.onreadystatechange = respuestaCargar;
  ajax.send();
}
function respuestaCargar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
  }
}

//Cargar contenido de mostrar
function cargarMostrar() {
  ajax.open("GET", "view/show.html", true);
  ajax.onreadystatechange = respuestaMostrar;
  ajax.send();
}

function respuestaMostrar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
    cargarTabla();
  }
}

//Cargar tabla
function cargarTabla() {
  ajax.open("GET", "models/consultar_producto.php", true);
  ajax.onreadystatechange = respuestaTabla;
  ajax.send();
}
function respuestaTabla() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    cargarDatos(respuesta.productos);
  }
}
function cargarDatos(productos) {
  tabla = document.getElementById("tabla");
  for (var i = 0; i < productos.length; i++) {
    var fila = document.createElement("tr");
    tabla.appendChild(fila);
    var celda1 = document.createElement("td");
    fila.appendChild(celda1);
    var id = document.createTextNode(productos[i].id);
    celda1.appendChild(id);
    var celda2 = document.createElement("td");
    fila.appendChild(celda2);
    var nombre = document.createTextNode(productos[i].nombre);
    celda2.appendChild(nombre);
    var celda3 = document.createElement("td");
    fila.appendChild(celda3);
    var cantidad = document.createTextNode(productos[i].cantidad);
    celda3.appendChild(cantidad);
  }
}

//Cargar contenido de agregar
function cargarAgregar() {
  ajax.open(
    "GET",
    "models/agregar_producto.php?" + obtenerQueryProducto(),
    true
  );
  ajax.onreadystatechange = respuestaAgregar;
  ajax.send();
}
function respuestaAgregar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 1) {
      document.getElementById("success").style.display = "block";
      document.getElementById("success").innerHTML = respuesta.mensaje;
      var delay = setTimeout(mostrar, 3000);
    } else {
      document.getElementById("danger").style.display = "block";
      document.getElementById("danger").innerHTML = respuesta.mensaje;
    }
  }
}
function obtenerQueryProducto() {
  var nombre = document.getElementById("nombre").value;
  var cantidad = document.getElementById("cantidad").value;
  var queryString =
    "nombre=" +
    encodeURIComponent(nombre) +
    "&cantidad=" +
    encodeURIComponent(cantidad) +
    "&nocache=" +
    Math.random();
  return queryString;
}

//Cargar contenido de actualizar
function cargarActualizar() {
  ajax.open("GET", "view/update.html", true);
  ajax.onreadystatechange = respuestaActualizar;
  ajax.send();
}
function respuestaActualizar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
    cargarTablaActualizar();
  }
}
//Cargar tabla actualizar
function cargarTablaActualizar() {
  ajax.open("GET", "models/consultar_producto.php", true);
  ajax.onreadystatechange = respuestaTablaActualizar;
  ajax.send();
}
function respuestaTablaActualizar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 0) {
      alert(respuesta.mensaje);
    } else {
      cargarDatosActualizar(respuesta.productos);
    }
  }
}

//Cargar contenido de actualizar en el select de producto y en el input de cantidad
function cargarDatosActualizar(productos) {
  select = document.getElementById("product"); //Se
  input = document.getElementById("cantidad");

  for (var i = 0; i < productos.length; i++) {
    var option = document.createElement("option");
    select.appendChild(option); //Se crean los option del select
    option.valor = i;
    option.value = productos[i].id;
    var nombre = document.createTextNode(productos[i].nombre); //Dentro de los options se poner el nombre de los productos
    option.appendChild(nombre);
  }
  //Escuchar el evento cuando selecciono alguno de los option
  select.addEventListener("change", function () {
    var selecionado = this.options[select.selectedIndex];
    input.value = productos[selecionado.valor].cantidad;
  });
}
function enviarActualizar() {
  ajax.open(
    "GET",
    "models/actualizar_producto.php?" + obtenerQueryProductoActualizar(),
    true
  );
  ajax.onreadystatechange = activarActualizar;
  ajax.send();
}
function activarActualizar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 1) {
      document.getElementById("success").style.display = "block";
      document.getElementById("success").innerHTML = respuesta.mensaje;
      var delay = setTimeout(mostrar, 3000);
    } else {
      document.getElementById("danger").style.display = "block";
      document.getElementById("danger").innerHTML = respuesta.mensaje;
    }
  }
}
function obtenerQueryProductoActualizar() {
  var id = document.getElementById("product").value;
  var cantidad = document.getElementById("cantidad").value;
  var queryString =
    "id=" +
    encodeURIComponent(id) +
    "&cantidad=" +
    encodeURIComponent(cantidad) +
    "&nocache=" +
    Math.random();
  return queryString;
}

//Cargar contenido de eliminar
function cargarBorrar() {
  ajax.open("GET", "view/delete.html", true);
  ajax.onreadystatechange = respuestaBorrar;
  ajax.send();
}
function respuestaBorrar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
    cargarSelectBorrar();
  }
}
function cargarSelectBorrar() {
  ajax.open("GET", "models/consultar_producto.php", true);
  ajax.onreadystatechange = respuestaSelectBorrar;
  ajax.send();
}
function respuestaSelectBorrar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 0) {
      alert(respuesta.mensaje);
    } else {
      cargarDatosSelectBorrar(respuesta.productos);
    }
  }
}
function cargarDatosSelectBorrar(productos) {
  select = document.getElementById("producto"); //Se
  input = document.getElementById("cantidad");
  for (var i = 0; i < productos.length; i++) {
    var option = document.createElement("option");
    select.appendChild(option); //Se crean los option del select
    option.valor = i;
    option.value = productos[i].id;
    var nombre = document.createTextNode(productos[i].nombre); //Dentro de los options se poner el nombre de los productos
    option.appendChild(nombre);
  }
  //Escuchar el evento
  select.addEventListener("change", function () {
    var selecionado = this.options[select.selectedIndex];
    input.value = productos[selecionado.valor].cantidad;
  });
}
function enviarBorrar() {
  ajax.open(
    "GET",
    "models/borrar_producto.php?" + obtenerQueryProductoBorrar(),
    true
  );
  ajax.onreadystatechange = activarBorrar;
  ajax.send();
}
function activarBorrar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 1) {
      document.getElementById("success").style.display = "block";
      document.getElementById("success").innerHTML = respuesta.mensaje;
      var delay = setTimeout(mostrar, 3000);
    } else {
      document.getElementById("danger").style.display = "block";
      document.getElementById("danger").innerHTML = respuesta.mensaje;
    }
  }
}
function obtenerQueryProductoBorrar() {
  var id = document.getElementById("producto").value;
  var queryString =
    "id=" + encodeURIComponent(id) + "&nocache=" + Math.random();
  return queryString;
}

//Cargar contenido de buscar
function cargarBuscar() {
  ajax.open("GET", "view/search.html", true);
  ajax.onreadystatechange = respuestaBuscar;
  ajax.send();
}
function respuestaBuscar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
  }
}
function cargarTablaBuscar() {
  ajax.open(
    "GET",
    "models/buscar_producto.php?" + obtenerQueryProductoBuscar(),
    true
  );
  ajax.onreadystatechange = respuestaTablaBuscar;
  ajax.send();
}
function respuestaTablaBuscar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 1) {
      document.getElementById("success").style.display = "block";
      document.getElementById("danger").style.display = "none";
      document.getElementById("success").innerHTML = respuesta.mensaje;
      cargarDatosBuscar(respuesta.productos);
    } else {
      document.getElementById("danger").style.display = "block";
      document.getElementById("success").style.display = "none";
      table = document.getElementById("table");
      table.style.display = "none";
      document.getElementById("danger").innerHTML = respuesta.mensaje;
    }
  }
}
function obtenerQueryProductoBuscar() {
  var nombre = document.getElementById("buscar").value;
  var queryString =
    "nombre=" + encodeURIComponent(nombre) + "&nocache=" + Math.random();
  return queryString;
}
function cargarDatosBuscar(productos) {
  tabla = document.getElementById("tabla");
  table = document.getElementById("table");
  table.style.display = "block";
  for (var i = 0; i < productos.length; i++) {
    var fila = document.createElement("tr");
    tabla.appendChild(fila);
    var celda1 = document.createElement("td");
    fila.appendChild(celda1);
    var id = document.createTextNode(productos[i].id);
    celda1.appendChild(id);
    var celda2 = document.createElement("td");
    fila.appendChild(celda2);
    var nombre = document.createTextNode(productos[i].nombre);
    celda2.appendChild(nombre);
    var celda3 = document.createElement("td");
    fila.appendChild(celda3);
    var cantidad = document.createTextNode(productos[i].cantidad);
    celda3.appendChild(cantidad);
  }
}

//Devulve  a la vista show y muestra todos los productos
function mostrar() {
  ajax.open("GET", "view/show.html", true);
  ajax.onreadystatechange = respuestaMostrar;
  ajax.send();
}
