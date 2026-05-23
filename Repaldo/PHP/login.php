<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Simulación de sesión (ya que no hay base de datos conectada aún)
    $_SESSION['usuario'] = "Viajero"; 
    $_SESSION['correo'] = $_POST['correo'];
    $_SESSION['nombre'] = "Viajero";
    $_SESSION['apellido'] = "Mundial";
    
    header("Location: inicio.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

<link rel="stylesheet" href="/CSS/login.css">

<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">

</head>

<body>

<!-- LOGO -->

<div class="logo">
Viajero Mundial
</div>


<!-- CUADRO LOGIN -->

<div class="login-container">

<h2>Inicio de sesión</h2>

<form method="POST" action="login.php">

<input type="email" name="correo" placeholder="Correo electrónico" required>

<input type="password" name="password" placeholder="Contraseña" required>

<button type="submit">Entrar</button>

</form>

<div class="register">
¿No tienes cuenta? <a href="registro.php">Regístrate</a>
</div>

<div class="note">

</div>

</div>

<script src="/JS/login.js"></script>

</body>
</html>