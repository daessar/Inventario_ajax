<?php 
    require_once "conexion.php";

    $conexion = new ConexionProductos();
    $conexion -> abrir();
    $productos = $conexion -> ObtenerProductos();
    $conexion-> cerrar();

    $respuesta = array();
    // Contar los elementos
    if(count($productos) >0){
        $respuesta["productos"] = $productos;
        $respuesta["accion"] = 1;
    }else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "No se encontraron productos";
    }
    echo json_encode($respuesta);
?>