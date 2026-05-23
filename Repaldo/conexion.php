<?php

$host = "gateway01.us-east-1.prod.aws.tidbcloud.com";
$user = "448qnrGB1HDPT1o.root";
$password = "ijUJAEtdTgFhtR2S";
$db = "boletos_futbol";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;port=4000;dbname=$db;charset=$charset";

$option = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    1009 => 'C:\xampp\htdocs\Viajero-Mundial\ca.pem',  // PDO::MYSQL_ATTR_SSL_CA
];

try{
    $pdo = new PDO($dsn, $user, $password, $option);
    echo "¡Conexión exitosa a la base de datos!";
}catch(\PDOException $e){
    error_log("error de conexión: " . $e->getMessage(),3,"errores.log");
    die("Error de conexión con la base de datos: " . $e->getMessage());
}

?>
