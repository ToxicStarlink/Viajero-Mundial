<?php

$host = "localhost";
$user = "root";
$password = "";
$db = "mundial_boletos";

$conn = new mysqli($host,$user,$password,$db);

if($conn->connect_error){
die("Error de conexión");
}

?>