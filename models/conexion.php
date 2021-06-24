<?php 
  class ConexionProductos{
    private $conexion;
    //Se crea el método abrir
    public function abrir()
    {
      //Se instancia la conexion a traves del constructor de pdo
      try
      {
        $this -> conexion = new PDO("mysql:host=localhost;dbname=inventario","root",""); //Se especifica la base de datos a la cual se va a conectar
        $this -> conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return 1;
      }
      catch (Exception $e)
      {
        return $e -> getMessage();
      }
    }

    public function cerrar()
    {
      $this -> conexion = null;
    }
    public function InsertarProducto(Producto $producto)
    {
      $consulta = $this -> conexion -> prepare("INSERT INTO producto VALUES(null, ?,?)");
      $consulta -> bindParam(1, $producto -> nombre);
      $consulta -> bindParam(2, $producto -> cantidad);
      $consulta -> execute();
      return $consulta -> rowCount();
    }
    public function ObtenerProductos()
    {
      $consulta = $this -> conexion -> prepare("SELECT * FROM producto");
      $consulta -> setFetchMode(PDO:: FETCH_ASSOC);
      $consulta -> execute();
      return $consulta -> fetchAll();
    }
    public function ActualizarProduto(Producto $producto)
    {
      $consulta = $this -> conexion -> prepare("UPDATE producto SET cantidad=? WHERE id=?");
      $consulta -> bindParam(1, $producto -> cantidad);
      $consulta -> bindParam(2, $producto -> id);
      $consulta -> execute();
      return $consulta -> rowCount();
    }
    public function eliminarProducto(Producto $producto)
    {
      $consulta = $this -> conexion -> prepare("DELETE FROM producto WHERE id = ?");
      $consulta -> bindParam(1, $producto -> id);
      $consulta -> execute();
      return $consulta -> rowCount();
    }
     public function ObtenerProductoNombre($nombre)
    {
      $buscador = "%" . $nombre . "%";
      $consulta = $this -> conexion -> prepare("SELECT * FROM producto WHERE nombre LIKE (?)");
      $consulta -> bindParam(1, $buscador);
      $consulta -> setFetchMode(PDO::FETCH_ASSOC);
      $consulta -> execute();
      return $consulta -> fetchAll();
    }
  }
?>