<?php 
    require_once "conexion.php";
    require_once "producto.php";

    $conexion = new ConexionProductos();
    $conexion -> abrir();

    $producto = new Producto();
    $producto->nombre = $_GET['nombre'];
    $producto->cantidad = $_GET['cantidad'];

    $respuesta = array();
    if($conexion->InsertarProducto($producto) > 0){
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Product inserted successfully";
    }else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Product could not be inserted";
    }
    $conexion->cerrar();
    echo json_encode($respuesta);
?>