<?php 
     // ----- ----- Conexion con el servidor ----- -----
    class Conexion{
        private $mySQLI;
        private $result;
        private $filasAfectadas;
        private $autoid;
        public function abrir(){
            $this->mySQLI = new mysqli("localhost","root","","inventario");
            if (mysqli_connect_error()) {
                return 0;
            } else {
                return 1;
            }
        }
        public function cerrar(){
            $this->mySQLI->close();
        }
        /* ___________________________ */
        /* inyección del código sql y asigna las 
        acciones a variables específicas */
        public function consulta($sql){
            $this->result = $this->mySQLI->query($sql); 
            $this->filasAfectadas = $this->mySQLI->affected_rows; 
            $this->autoid = $this->mySQLI->insert_id; 
        }
        /* ___________________________ */
        /* Retorno de los resultados */
        public function obtenerResult(){
            return $this->result;
        }
        public function obtenerFilasAfectadas(){
            return $this->filasAfectadas;
        }
        public function obtenerAutoId(){
            return $this->autoid;
        }
    }
  // class ConexionProductos{
  //   private $conexion;
  //   //Se crea el método abrir
  //   public function abrir()
  //   {
  //     //Se instancia la conexion a traves del constructor de pdo
  //     try
  //     {
  //       $this -> conexion = new PDO("mysql:host=localhost;dbname=inventario","root",""); //Se especifica la base de datos a la cual se va a conectar
  //       $this -> conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //       return 1;
  //     }
  //     catch (Exception $e)
  //     {
  //       return $e -> getMessage();
  //     }
  //   }
  //   public function cerrar()
  //   {
  //     $this -> conexion = null;
  //   }
  //   public function InsertarProducto(Producto $producto)
  //   {
  //     $consulta = $this -> conexion -> prepare("INSERT INTO producto VALUES(null, ?,?)");
  //     $consulta -> bindParam(1, $producto -> nombre);
  //     $consulta -> bindParam(1, $producto -> cantidad);
  //     $consulta -> execute();
  //     return $consulta -> rowCount();
  //   }
  //   public function ObtenerProductos()
  //   {
  //     $consulta = $this -> conexion -> prepare("SELECT * FROM producto ORDER BY nombre");
  //     $consulta -> setFetchMode(PDO:: FETCH_OBJ);
  //     $consulta -> execute();
  //     return $consulta -> fetchAll();
  //   }
  // }
?>