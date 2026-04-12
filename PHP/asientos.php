<?php
session_start();

$partido = $_GET['partido'] ?? null;
$zona = $_GET['zona'] ?? null;

$nombrePartido = "";
$estadio = "";
$fecha = "";

switch($partido){

case "P001":
$nombrePartido = "México vs España";
$estadio = "Estadio Azteca - Ciudad de México";
$fecha = "29 Junio 2026 · 18:00";
break;

case "P002":
$nombrePartido = "Argentina vs Alemania";
$estadio = "SoFi Stadium - Los Ángeles";
$fecha = "14 Junio 2026 · 18:00";
break;

case "P003":
$nombrePartido = "Brasil vs Francia";
$estadio = "BMO Field - Toronto";
$fecha = "16 Junio 2026 · 19:00";
break;

default:
$nombrePartido = "Partido";
}

?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

<link rel="stylesheet" href="/CSS/asientos.css">

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

<a class="login" href="login.php">Inicio de Sesión</a>

</div>

</header>

<section class="info-partido">

<h1><?php echo $nombrePartido; ?></h1>
<p class="estadio"><?php echo $estadio; ?></p>
<p class="fecha"><?php echo $fecha; ?></p>

</section>


<section class="asientos">

<div class="contenedor-asientos">

<?php

$filas = range('A','P');
$columnas = 10;

foreach($filas as $fila){

for($i=1;$i<=$columnas;$i++){

/* PASILLO CENTRAL */
if($i == 6){
echo "<div class='pasillo'></div>";
}

$asientoID = $fila.$i;

echo "<div class='asiento' id='$asientoID' data-asiento='$asientoID'>$i</div>";

}

}

?>

</div>


<div class="panel-compra">

<p>Asientos seleccionados: <span id="contador">0</span></p>

<button id="comprar">Comprar boletos</button>

</div>

</section>


<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

<script src="/JS/asientos.js"></script>

</body>
</html>