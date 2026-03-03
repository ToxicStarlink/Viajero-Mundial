<?php
session_start();

/*

BASE DE DATOS FUTURA

TABLA: usuarios

id_usuario
nombre
apellido
usuario
correo
password
fecha_registro


TABLA: compras

id_compra INT AUTO_INCREMENT PRIMARY KEY
id_usuario INT
id_partido INT
equipo_local
equipo_visitante
estadio
fecha_partido
precio
cantidad_boletos
fecha_compra DATETIME

RELACION

usuarios.id_usuario = compras.id_usuario

Esto permitirá mostrar en el perfil todas las compras del usuario.

*/

?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>Mi perfil | Viajero Mundial</title>

<link rel="stylesheet" href="inicio.css">

<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">

</head>

<body>

<header class="header">

<div class="logo">
<a href="inicio.php">Viajero Mundial</a>
</div>

<div class="menu-derecha">

<nav class="nav">
<a href="partidos.php">Partidos</a>
<a href="guia.php">Guía Turística</a>
</nav>

<a href="perfil.php" class="login">Mi perfil</a>

</div>

</header>


<section class="perfil">

<h2>Mi perfil</h2>

<div class="perfil-contenedor">

<div class="perfil-datos">

<h3>Información del usuario</h3>

<p><strong>Usuario:</strong> July</p>

<p><strong>Nombre:</strong> Julian</p>

<p><strong>Apellido:</strong> Macias</p>

<p><strong>Correo:</strong> July3p@gmail.com</p>

<p><strong>Miembro desde:</strong> 2026</p>

</div>

</div>

</section>



<section class="compras">

<h2>Mis compras</h2>

<div class="contenedor-compras">


<div class="compra-card">

<img src="IMG/partido1.jpg">

<div class="compra-info">

<h3>México vs Brasil</h3>

<p>Estadio Azteca · Ciudad de México</p>

<span>2 boletos · $240 USD</span>

</div>

</div>



<div class="compra-card">

<img src="IMG/partido2.jpg">

<div class="compra-info">

<h3>Argentina vs Francia</h3>

<p>Estadio Lusail · Qatar</p>

<span>1 boleto · $150 USD</span>

</div>

</div>



</div>

</section>


<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

</body>
</html>