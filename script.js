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
  cargarPlantilla("start.html");
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
  ajax.open("GET", "show.html", true);
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
  ajax.open("GET", "consultar_producto.php", true);
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
  ajax.open("GET", "agregar_producto.php?" + obtenerQueryProducto(), true);
  ajax.onreadystatechange = respuestaAgregar;
  ajax.send();
}
function respuestaAgregar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var respuesta = JSON.parse(ajax.responseText);
    if (respuesta.accion == 1) {
      document.getElementById("success").style.display = "block";
      document.getElementById("success").innerHTML = respuesta.mensaje;
    } else {
      document.getElementById("danger").style.display = "block";
      document.getElementById("danger").innerHTML = respuesta.mensaje;
    }
  }
}
function obtenerQueryProducto() {
  var id = document.getElementById("id").value;
  var nombre = document.getElementById("nombre").value;
  var cantidad = document.getElementById("cantidad").value;
  var queryString =
    "id=" +
    encodeURIComponent(id) +
    "&nombre=" +
    encodeURIComponent(nombre) +
    "&cantidad=" +
    encodeURIComponent(cantidad) +
    "&nocache=" +
    Math.random();
  return queryString;
}

//Cargar contenido de actualizar
function cargarActualizar() {
  ajax.open("GET", "update.html", true);
  ajax.onreadystatechange = respuestaActualizar;
  ajax.send();
}
function respuestaActualizar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
  }
}

//Cargar contenido de eliminar
function cargarBorrar() {
  ajax.open("GET", "delete.html", true);
  ajax.onreadystatechange = respuestaBorrar;
  ajax.send();
}
function respuestaBorrar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
  }
}

//Cargar contenido de buscar
function cargarBuscar() {
  ajax.open("GET", "search.html", true);
  ajax.onreadystatechange = respuestaBuscar;
  ajax.send();
}
function respuestaBuscar() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    document.getElementById("content").innerHTML = ajax.responseText;
  }
}
