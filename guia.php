<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="partidos.css">
<link rel="stylesheet" href="guia.css">

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

<a class="login" href="login.php">Iniciar sesión</a>

</div>

</header>


<section class="guia">

<h1>Guía Turística del Mundial 2026</h1>

<p class="subtitulo">
Explora los países anfitriones del Mundial 2026 y descubre sus ciudades,
estadios y lugares turísticos.
</p>


<div class="contenedor-guia">


<!-- MEXICO -->

<div class="guia-card">

<img src="img/mexico.jpg">

<div class="guia-info">

<h3>🇲🇽 México</h3>

<p>
México será sede histórica del Mundial 2026.
Ofrece cultura, gastronomía y estadios legendarios.
</p>

<ul>

<li>Estadio Azteca — Ciudad de México</li>
<li>Estadio BBVA — Monterrey</li>
<li>Estadio Akron — Guadalajara</li>

</ul>

<button onclick="verPais('mexico')">
Explorar destinos
</button>

</div>

</div>


<!-- USA -->

<div class="guia-card">

<img src="img/usa.jpg">

<div class="guia-info">

<h3>🇺🇸 Estados Unidos</h3>

<p>
Estados Unidos tendrá la mayor cantidad de partidos
y estadios modernos en ciudades icónicas.
</p>

<ul>

<li>SoFi Stadium — Los Ángeles</li>
<li>AT&T Stadium — Dallas</li>
<li>MetLife Stadium — Nueva York</li>

</ul>

<button onclick="verPais('usa')">
Explorar destinos
</button>

</div>

</div>


<!-- CANADA -->

<div class="guia-card">

<img src="img/canada.jpg">

<div class="guia-info">

<h3>🇨🇦 Canadá</h3>

<p>
Canadá aportará estadios modernos rodeados
de paisajes naturales impresionantes.
</p>

<ul>

<li>BC Place — Vancouver</li>
<li>BMO Field — Toronto</li>

</ul>

<button onclick="verPais('canada')">
Explorar destinos
</button>

</div>

</div>


</div>

</section>


<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

<script src="guia.js"></script>

</body>
</html>