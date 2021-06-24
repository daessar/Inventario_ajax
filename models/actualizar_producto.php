<?php 
    require_once "conexion.php";
    require_once "producto.php";

    $conexion = new ConexionProductos();
    $producto = new Producto();
    $conexion -> abrir();
    $producto -> id = $_GET['id'];
    $producto -> cantidad = $_GET['cantidad'];

    $respuesta = array();
    // Contar los elementos
    if($conexion -> ActualizarProduto($producto) > 0){
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Product update successfully";
    }else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Product could not be update ";
    }
    $conexion-> cerrar();
    echo json_encode($respuesta);
?>