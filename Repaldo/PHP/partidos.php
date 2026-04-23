<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

<link rel="stylesheet" href="/CSS/partidos.css">

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

<?php if(isset($_SESSION['usuario'])){ ?>
    <a href="perfil.php" class="login">Mi perfil</a>
<?php } else { ?>
    <a href="login.php" class="login">Iniciar sesión</a>
<?php } ?>

</div>

</header>



<section class="partidos">

<h2>Boletos para Copa Mundial de Fútbol</h2>

<div class="filtros">

<input type="text" id="buscarEquipo" placeholder="Buscar equipo...">

<select id="filtroEquipo">
<option value="todos">Todos los equipos</option>
<option value="alemania">Alemania</option>
<option value="argentina">Argentina</option>
<option value="austria">Austria</option>
<option value="brasil">Brasil</option>
<option value="colombia">Colombia</option>
<option value="ecuador">Ecuador</option>
<option value="espana">España</option>
<option value="francia">Francia</option>
<option value="inglaterra">Inglaterra</option>
<option value="italia">Italia</option>
<option value="mexico">México</option>
<option value="paisesbajos">Países Bajos</option>
<option value="paraguay">Paraguay</option>
<option value="portugal">Portugal</option>
<option value="suiza">Suiza</option>
<option value="uruguay">Uruguay</option>
</select>

<select id="filtroPais">
<option value="todos">Todos los países sede</option>
<option value="mexico">México</option>
<option value="usa">Estados Unidos</option>
<option value="canada">Canadá</option>
</select>

<select id="ordenarFecha">
<option value="normal">Orden normal</option>
<option value="asc">Fecha más cercana</option>
<option value="desc">Fecha más lejana</option>
</select>

</div>

<div class="contenedor-partidos-lista">

<div class="partido" data-team="mexico espana" data-pais="mexico" data-fecha="2026-06-29">
<div class="partido-info">
<h3>México vs España</h3>
<p>Fecha y hora: 29/06/2026 · 18:00</p>
<p>México, Ciudad de México, CDMX</p>
</div>

<button onclick="verBoletos('P001')">
Ver boletos
</button>
</div>



<div class="partido" data-team="argentina alemania" data-pais="usa" data-fecha="2026-06-14">
<div class="partido-info">
<h3>Argentina vs Alemania</h3>
<p>Fecha y hora: 14/06/2026 · 18:00</p>
<p>USA, Los Ángeles, California</p>
</div>

<button onclick="verBoletos('P002')">
Ver boletos
</button>
</div>



<div class="partido" data-team="brasil francia" data-pais="canada" data-fecha="2026-06-16">
<div class="partido-info">
<h3>Brasil vs Francia</h3>
<p>Fecha y hora: 16/06/2026 · 19:00</p>
<p>Canadá, Toronto, Ontario</p>
</div>

<button onclick="verBoletos('P003')">
Ver boletos
</button>
</div>



<div class="partido" data-team="portugal inglaterra" data-pais="usa" data-fecha="2026-06-18">
<div class="partido-info">
<h3>Portugal vs Inglaterra</h3>
<p>Fecha y hora: 18/06/2026 · 17:00</p>
<p>USA, Dallas, Texas</p>
</div>

<button onclick="verBoletos('P004')">
Ver boletos
</button>
</div>



<div class="partido" data-team="italia paisesbajos" data-pais="mexico" data-fecha="2026-06-20">
<div class="partido-info">
<h3>Italia vs Países Bajos</h3>
<p>Fecha y hora: 20/06/2026 · 21:00</p>
<p>México, Guadalajara, Jalisco</p>
</div>

<button onclick="verBoletos('P005')">
Ver boletos
</button>
</div>



<div class="partido" data-team="uruguay colombia" data-pais="usa" data-fecha="2026-06-22">
<div class="partido-info">
<h3>Uruguay vs Colombia</h3>
<p>Fecha y hora: 22/06/2026 · 18:30</p>
<p>USA, Miami, Florida</p>
</div>

<button onclick="verBoletos('P006')">
Ver boletos
</button>
</div>



<div class="partido" data-team="ecuador paraguay" data-pais="canada" data-fecha="2026-06-26">
<div class="partido-info">
<h3>Ecuador vs Paraguay</h3>
<p>Fecha y hora: 26/06/2026 · 17:00</p>
<p>Canadá, Toronto, Ontario</p>
</div>

<button onclick="verBoletos('P007')">
Ver boletos
</button>
</div>



<div class="partido" data-team="austria suiza" data-pais="mexico" data-fecha="2026-06-29">
<div class="partido-info">
<h3>Austria vs Suiza</h3>
<p>Fecha y hora: 29/06/2026 · 19:30</p>
<p>México, Ciudad de México, CDMX</p>
</div>

<button onclick="verBoletos('P008')">
Ver boletos
</button>
</div>



</div>

</section>

<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

<script src="/JS/partidos.js"></script>

</body>
</html>