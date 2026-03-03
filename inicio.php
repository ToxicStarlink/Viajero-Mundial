<?php
session_start();

/* FUTURA BASE DE DATOS

Tabla: partidos
id_partido
equipo_local
equipo_visitante
estadio
ciudad
fecha
precio
imagen
*/
?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>⚽ Viajero Mundial</title>

<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="inicio.css">

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


<section class="hero" id="hero">

<div class="hero-content">

<h1>Boletos para el Mundial</h1>
<p>¡Encuentra, reserva y disfruta los mejores eventos con solo unos clics!</p> 


</div>

</div>

</section>


<section class="eventos">

<h2>Partidos destacados</h2>

<div class="contenedor-partidos">

<div class="card" data-partido="mexico-brasil">
<img src="IMG/partido1.jpg">
<div class="card-info">
<h3>México vs Brasil</h3>
<p>Estadio Azteca · Ciudad de México</p>
<span>$120 USD</span>
</div>
</div>

<div class="card" data-partido="argentina-francia">
<img src="IMG/partido2.jpg">
<div class="card-info">
<h3>Argentina vs Francia</h3>
<p>Estadio Lusail · Qatar</p>
<span>$150 USD</span>
</div>
</div>

<div class="card" data-partido="espana-alemania">
<img src="IMG/partido3.jpg">
<div class="card-info">
<h3>España vs Alemania</h3>
<p>Allianz Arena · Alemania</p>
<span>$130 USD</span>
</div>
</div>

</div>

</section>


<section class="proximos">

<h2>Próximos partidos del mundial</h2>

<div class="contenedor-proximos">

<div class="proximo-card">

<img src="IMG/partido4.jpg">

<div class="proximo-info">
<h3>Argentina vs Alemania</h3>
<p>14 Junio</p>
</div>

<div class="tooltip">
La informacion no ha sido dada
</div>

</div>


<div class="proximo-card">

<img src="IMG/partido5.jpg">

<div class="proximo-info">
<h3>Brasil vs Francia</h3>
<p>16 Junio</p>
</div>

<div class="tooltip">
La informacion no ha sido dada
</div>

</div>


<div class="proximo-card">

<img src="IMG/partido6.jpg">

<div class="proximo-info">
<h3>México vs España</h3>
<p>18 Junio</p>
</div>

<div class="tooltip">
La informacion no ha sido dada
</div>

</div>

</div>

</section>

<section class="beneficios">

<div class="beneficios-contenedor">

<div class="beneficios-texto">

<h2>¿Por qué comprar con nosotros?</h2>

<p>
En <strong>Viajero Mundial</strong> ofrecemos una plataforma moderna, segura y confiable
para adquirir boletos para los partidos más esperados del mundial. Nuestra prioridad
es brindar a los aficionados una experiencia de compra rápida, transparente y sin
complicaciones, garantizando siempre la autenticidad de cada boleto.
</p>

<div class="beneficio">

<h3>Compra segura</h3>

<p>
Nuestro sistema utiliza protocolos avanzados de seguridad digital y verificación
de pagos, permitiendo que cada transacción sea protegida mediante tecnologías
modernas de encriptación. Miles de aficionados ya confían en nuestra plataforma
para adquirir sus entradas sin riesgos.
</p>

</div>

<div class="beneficio">

<h3>Boletos verificados</h3>

<p>
Cada boleto disponible en nuestra plataforma pasa por un proceso de validación
para asegurar su autenticidad. Trabajamos con distribuidores confiables y
proveedores autorizados para garantizar que los aficionados reciban entradas
legítimas para cada partido del mundial.
</p>

</div>

<div class="beneficio">

<h3>Entrega digital inmediata</h3>

<p>
Una vez completada la compra, los boletos son enviados digitalmente de forma
inmediata al correo electrónico del comprador. Esto permite acceder a los
partidos sin retrasos y sin necesidad de recoger entradas físicas.
</p>

</div>

</div>


<div class="beneficios-imagen">

<img src="IMG/partido7.jpg">

</div>

</div>

</section>

<section class="noticias">

<h2>Noticias del mundial</h2>

<p class="subtitulo"></p>

<div class="contenedor-noticias">


<div class="noticia-card">

<img src="IMG/info1.jpg">

<div class="noticia-info">

<h3>Se anuncian nuevas sedes para el Mundial 2030</h3>

<p>
La FIFA anunció oficialmente nuevas sedes que formarán parte del mundial,
expandiendo la lista de ciudades anfitrionas y aumentando la capacidad
para recibir a millones de aficionados.
</p>

</div>

</div>


<div class="noticia-card">

<img src="IMG/info2.jpg">

<div class="noticia-info">

<h3>La FIFA revela el balón oficial del torneo</h3>

<p>
El nuevo balón oficial del torneo ha sido presentado con un diseño
innovador inspirado en la velocidad del juego moderno y la tecnología
de seguimiento utilizada durante los partidos.
</p>

</div>

</div>


<div class="noticia-card">
    
<img src="IMG/info3.jpg">

<div class="noticia-info">

<h3>Los estadios que recibirán la final</h3>

<p>
Se han confirmado los estadios que competirán por albergar la gran final
del mundial, destacando instalaciones modernas y recintos históricos
del fútbol internacional.
</p>

</div>

</div>


</div>

</section>

<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

<script src="inicio.js"></script>

</body>
</html>