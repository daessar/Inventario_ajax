<?php 
    require_once "conexion.php";
    require_once "producto.php";

    $conexion = new ConexionProductos();
    $producto = new Producto();
    $conexion -> abrir();
    $producto -> id = $_GET['id'];

    $respuesta = array();
    // Contar los elementos
    if($conexion -> eliminarProducto($producto) > 0){
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Product has been successfully deleted";
    }else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Product could not be deleted";
    }
    $conexion-> cerrar();
    echo json_encode($respuesta);
?>