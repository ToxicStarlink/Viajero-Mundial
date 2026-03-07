<?php

$host = "localhost";
$user = "root";
$password = "admin";
$db = "boletos_futbol";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset"; //cadena de tectto para decir que queremos conectarnos
//a mysql, en nuestra compu y a esa base de datos

$option = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,//sirve para capturar los errores
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try{
    $pdo = new PDO($dsn, $user, $password, $option);
    echo "¡Conexión exitosa a la base de datos!";
}catch(\PDOException $e){
    error_log("error de conexión: " . $e->getMessage(),3,"errores.log");
    die("Error de conexión con la base de datos.");
}

?>
