<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION['nombre'] = $_POST['nombre'];
    $_SESSION['apellido'] = $_POST['apellido'];
    $_SESSION['usuario'] = $_POST['usuario'];
    $_SESSION['correo'] = $_POST['correo'];
    
    header("Location: inicio.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

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