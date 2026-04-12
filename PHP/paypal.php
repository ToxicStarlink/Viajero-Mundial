<?php

$asientos = $_GET['asientos'] ?? "";
$total = $_GET['total'] ?? 0;

?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>Pago con PayPal</title>

<link rel="stylesheet" href="/CSS/paypal.css">

<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">

</head>

<body>

<header class="header">

<div class="logo">
<a href="#">PayPal</a>
</div>

</header>

<section class="paypal">

<div class="paypal-box">

<h2>Completar pago</h2>

<p><b>Asientos:</b> <?php echo $asientos; ?></p>

<p class="total"><b>Total:</b> $<?php echo $total; ?></p>

<button id="pagar">Pagar con PayPal</button>

</div>

</section>

<footer>

<p>© 2026 Viajero Mundial</p>

</footer>

<script src="/JS/paypal.js"></script>

</body>

</html>