<?php 
    require_once "conexion.php";

    $conexion = new ConexionProductos();
    $conexion -> abrir();
    $nombre = $_GET['nombre'];
    $productos = $conexion -> ObtenerProductoNombre($nombre);
    $conexion-> cerrar();
    $respuesta = array();
    // Contar los elementos
    if(count($productos) > 0){
        $respuesta["productos"] = $productos;
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "The following products have been found 😎";
    }else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Products not found 😥";
    }
    echo json_encode($respuesta);
?>