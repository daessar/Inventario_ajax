<?php 
      // ----- ----- Agregar productos ----- -----
    require_once "conexion.php";
    $conexion = new Conexion();
    /* ___________________________ */
    /* El siguiente código llama la función abrir 
    de la conexión, con == 0 devolverá un boolean.
    Creo funcionará más en una condición*/
    $conexion->abrir() == 0;
    $id = $_GET["id"];
    $nombre = $_GET["nombre"];
    $cantidad = $_GET["cantidad"];
    $sql = "INSERT INTO producto VALUES ($id, '$nombre', $cantidad)";
    /* ___________________________ */
    /* Enviará a la función consulta de la conexión
    el insert */
    $conexion->consulta($sql);
    $conexion->cerrar();
    $respuesta = array();
    /* ___________________________ */
    /* Se asignan los valores para el array según sean
    las filas afectadas mayores o no a 0 */
    if ($conexion->obtenerFilasAfectadas() > 0) {
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Producto insertado con exito";
    } else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Producto no pudo ser insertado";
    }
    /* ___________________________ */
    /* Envío del array */
    echo json_encode($respuesta);
?>