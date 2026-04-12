<?php
session_start();

$partido = $_GET['partido'] ?? null;
$asientos = $_GET['asientos'] ?? "";
$total = $_GET['total'] ?? 0;

$nombrePartido = "";
$estadio = "";
$ciudad = "";
$fecha = "";

switch($partido){

case "P001":
$nombrePartido = "México vs España";
$estadio = "Estadio Azteca";
$ciudad = "Ciudad de México";
$fecha = "29 Junio 2026 · 18:00";
break;

case "P002":
$nombrePartido = "Argentina vs Alemania";
$estadio = "SoFi Stadium";
$ciudad = "Los Ángeles";
$fecha = "14 Junio 2026 · 18:00";
break;

case "P003":
$nombrePartido = "Brasil vs Francia";
$estadio = "BMO Field";
$ciudad = "Toronto";
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
<title>Confirmar Compra</title>

<link rel="stylesheet" href="/CSS/compra.css">

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


<section class="compra">

<div class="contenedor-compra">

<div class="imagen-partido">

<img src="img/info3.jpg" alt="Partido">

</div>


<div class="info-compra">

<h1><?php echo $nombrePartido; ?></h1>

<p class="dato"><b>Estadio:</b> <?php echo $estadio; ?></p>

<p class="dato"><b>Ciudad:</b> <?php echo $ciudad; ?></p>

<p class="dato"><b>Fecha:</b> <?php echo $fecha; ?></p>

<p class="dato"><b>Asientos:</b> <?php echo $asientos; ?></p>

<p class="precio"><b>Total:</b> $<?php echo $total; ?></p>

<div id="paypal-section" style="margin-top: 24px;" data-total="<?php echo htmlspecialchars($total); ?>" data-asientos="<?php echo htmlspecialchars($asientos); ?>">
  <div id="paypal-button-container"></div>
  <p id="paypal-message" style="display:none; color:#b22222; margin-top:12px;"></p>
</div>

</div>

</div>

</section>


<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

<script src="https://www.paypal.com/sdk/js?client-id=sb&currency=MXN"></script>
<script src="/JS/compra.js"></script>

</body>
</html>