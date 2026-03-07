<?php

session_start();
/* RECIBIR ID DEL PARTIDO */
$partido = $_GET['partido'] ?? null;
/* INFORMACION DE LOS PARTIDOS */
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

case "P004":
$nombrePartido = "Portugal vs Inglaterra";
$estadio = "AT&T Stadium - Dallas";
$fecha = "18 Junio 2026 · 17:00";
break;

case "P005":
$nombrePartido = "Italia vs Países Bajos";
$estadio = "Estadio Akron - Guadalajara";
$fecha = "20 Junio 2026 · 21:00";
break;

case "P006":
$nombrePartido = "Uruguay vs Colombia";
$estadio = "Hard Rock Stadium - Miami";
$fecha = "22 Junio 2026 · 18:30";
break;

case "P007":
$nombrePartido = "Ecuador vs Paraguay";
$estadio = "BMO Field - Toronto";
$fecha = "26 Junio 2026 · 17:00";
break;

case "P008":
$nombrePartido = "Austria vs Suiza";
$estadio = "Estadio Azteca - Ciudad de México";
$fecha = "29 Junio 2026 · 19:30";
break;

default:
$nombrePartido = "Partido no encontrado";
$estadio = "";
$fecha = "";
}

?>

<!DOCTYPE html>
<html lang="es">
<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

<link rel="stylesheet" href="boletos.css">

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

<div class="contenedor-pagina">

<section class="boletos">

<div class="mapa-estadio">

<div class="mapa">

<!-- MAPA BASE -->
<img src="MAP/A1.png" class="estadio-base">

<!-- ZONAS -->
<div class="zona zona-e1" onclick="comprarZona('E1')">
<img src="MAP/E1.png">
</div>

<div class="zona zona-e2" onclick="comprarZona('E2')">
<img src="MAP/E2.png">
</div>

<div class="zona zona-e3" onclick="comprarZona('E3')">
<img src="MAP/E3.png">
</div>

<div class="zona zona-e4" onclick="comprarZona('E4')">
<img src="MAP/E4.png">
</div>

<div class="zona zona-e5" onclick="comprarZona('E5')">
<img src="MAP/E5.png">
</div>

<div class="zona zona-e6" onclick="comprarZona('E6')">
<img src="MAP/E6.png">
</div>

<div class="zona zona-e7" onclick="comprarZona('E7')">
<img src="MAP/E7.png">
</div>

<div class="zona zona-e8" onclick="comprarZona('E8')">
<img src="MAP/E8.png">
</div>

<div class="zona zona-f1" onclick="comprarZona('F1')">
<img src="MAP/F1.png">
</div>

<div class="zona zona-f2" onclick="comprarZona('F2')">
<img src="MAP/F2.png">
</div>

<div class="zona zona-f3" onclick="comprarZona('F3')">
<img src="MAP/F3.png">
</div>

<div class="zona zona-f4" onclick="comprarZona('F4')">
<img src="MAP/F4.png">
</div>

<div class="zona zona-f5" onclick="comprarZona('F5')">
<img src="MAP/F5.png">
</div>

<div class="zona zona-f6" onclick="comprarZona('F6')">
<img src="MAP/F6.png">
</div>

<div class="zona zona-f7" onclick="comprarZona('F7')">
<img src="MAP/F7.png">
</div>

<div class="zona zona-f8" onclick="comprarZona('F8')">
<img src="MAP/F8.png">
</div>

<div class="zona zona-g1" onclick="comprarZona('G1')">
<img src="MAP/G1.png">
</div>

<div class="zona zona-g2" onclick="comprarZona('G2')">
<img src="MAP/G2.png">
</div>

<div class="zona zona-g3" onclick="comprarZona('G3')">
<img src="MAP/G3.png">
</div>

<div class="zona zona-g4" onclick="comprarZona('G4')">
<img src="MAP/G4.png">

</div>

</div>

</div>

</section>

<footer>
<p>© 2026 Viajero Mundial</p>
</footer>

</div>

<script src="boletos.js"></script>

</body>
</html>