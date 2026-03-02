<?php
/*

NOTAS PARA BASE DE DATOS

TABLA: usuarios

id_usuario INT AUTO_INCREMENT PRIMARY KEY
nombre VARCHAR(100)
apellido VARCHAR(100)
usuario VARCHAR(100)
correo VARCHAR(150) UNIQUE
password VARCHAR(255)
fecha_registro DATETIME

PROCESO FUTURO:

Conectar base de datos

$conn = new mysqli("localhost","usuario","password","basedatos");

Recibir datos POST

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$usuario = $_POST['usuario'];
$correo = $_POST['correo'];
$password = $_POST['password'];

Encriptar contraseña

$password_hash = password_hash($password, PASSWORD_DEFAULT);

4 Insertar usuario

INSERT INTO usuarios (nombre,apellido,correo,password,fecha_registro)

5 Redirigir a login.php

*/

?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>Registro | Viajero Mundial</title>

<link rel="stylesheet" href="login.css">

<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">

</head>

<body>

<div class="logo">
Viajero Mundial
</div>

<div class="login-container">

<h2>Crear cuenta</h2>

<form method="POST" action="registro.php">

<input type="text" name="nombre" placeholder="Nombre" required>

<input type="text" name="apellido" placeholder="Apellido" required>

<input type="text" name="usuario" placeholder="Usuario" required>

<input type="email" name="correo" placeholder="Correo electrónico" required>

<input type="password" id="password" name="password" placeholder="Contraseña" required>

<input type="password" id="confirmar" placeholder="Confirmar contraseña" required>

<button type="submit">Registrarse</button>

</form>

<div class="register">
¿Ya tienes cuenta? <a href="login.php">Iniciar sesión</a>
</div>

</div>

<script src="registro.js"></script>

</body>
</html>