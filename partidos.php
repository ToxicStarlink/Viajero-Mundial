<?php
/*

BASE DE DATOS FUTURA

TABLA: partidos

id_partido
equipo_local
equipo_visitante
pais_sede
ciudad
fecha
precio


TABLA: compras

id_compra
id_usuario
id_partido
equipo_local
equipo_visitante
pais_sede
ciudad
fecha_partido
precio
cantidad
fecha_compra

*/

?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>Partidos | Viajero Mundial</title>

<link rel="stylesheet" href="inicio.css">
<link rel="stylesheet" href="partidos.css">

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
<a href="#">Estadios</a>
</nav>

<a href="perfil.php" class="login">Mi perfil</a>

</div>

</header>


<section class="tabla-partidos">

<h2>Partidos del Mundial 2026</h2>

<table>

<thead>

<tr>
<th>Partido</th>
<th>País sede</th>
<th>Ciudad</th>
<th>Fecha</th>
<th>Precio</th>
<th></th>
</tr>

</thead>

<tbody>


<tr>
<td>México vs España</td>
<td>MX</td>
<td>Ciudad de México</td>
<td>14/06/2026</td>
<td>$120</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Argentina vs Alemania</td>
<td>USA</td>
<td>Los Ángeles</td>
<td>15/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Brasil vs Francia</td>
<td>USA</td>
<td>Dallas</td>
<td>16/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Inglaterra vs Portugal</td>
<td>CD</td>
<td>Toronto</td>
<td>17/06/2026</td>
<td>$180</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Japón vs Corea del Sur</td>
<td>USA</td>
<td>San Francisco</td>
<td>18/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Uruguay vs Países Bajos</td>
<td>MX</td>
<td>Guadalajara</td>
<td>19/06/2026</td>
<td>$120</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Colombia vs Bélgica</td>
<td>USA</td>
<td>Miami</td>
<td>20/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Marruecos vs Croacia</td>
<td>CD</td>
<td>Vancouver</td>
<td>21/06/2026</td>
<td>$180</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Egipto vs Suiza</td>
<td>USA</td>
<td>Atlanta</td>
<td>22/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Senegal vs Austria</td>
<td>MX</td>
<td>Monterrey</td>
<td>23/06/2026</td>
<td>$120</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Argentina vs Uruguay</td>
<td>USA</td>
<td>New York</td>
<td>24/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Brasil vs Portugal</td>
<td>CD</td>
<td>Toronto</td>
<td>25/06/2026</td>
<td>$180</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>España vs Alemania</td>
<td>USA</td>
<td>Houston</td>
<td>26/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Francia vs Bélgica</td>
<td>MX</td>
<td>Ciudad de México</td>
<td>27/06/2026</td>
<td>$120</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Inglaterra vs Países Bajos</td>
<td>USA</td>
<td>Seattle</td>
<td>28/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>México vs Argentina</td>
<td>MX</td>
<td>Guadalajara</td>
<td>29/06/2026</td>
<td>$120</td>
<td><button class="comprar">Comprar</button></td>
</tr>

<tr>
<td>Brasil vs España</td>
<td>USA</td>
<td>Los Ángeles</td>
<td>30/06/2026</td>
<td>$220</td>
<td><button class="comprar">Comprar</button></td>
</tr>

</tbody>

</table>

</section>

<script src="partidos.js"></script>

</body>
</html>