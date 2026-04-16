<?php
session_start();
include '../conexion.php';
$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST['nombre'] ?? '');
    $apellido = trim($_POST['apellido'] ?? '');
    $usuario = trim($_POST['usuario'] ?? '');
    $correo = trim($_POST['correo'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmar = $_POST['confirmar'] ?? '';

    if (!$nombre || !$apellido || !$usuario || !$correo || !$password || !$confirmar) {
        $error = 'Todos los campos son obligatorios.';
    } elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $error = 'El correo no es válido.';
    } elseif ($password !== $confirmar) {
        $error = 'Las contraseñas no coinciden.';
    } else {
        try {
            $sql = 'SELECT id FROM usuarios WHERE usuario = ? OR correo = ?';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$usuario, $correo]);

            if ($stmt->rowCount() > 0) {
                $error = 'El usuario o el correo ya están registrados.';
            } else {
                $hash = password_hash($password, PASSWORD_BCRYPT);
                $sql = 'INSERT INTO usuarios (nombre, apellido, usuario, correo, password) VALUES (?, ?, ?, ?, ?)';
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$nombre, $apellido, $usuario, $correo, $hash]);

                $_SESSION['id'] = $pdo->lastInsertId();
                $_SESSION['nombre'] = $nombre;
                $_SESSION['apellido'] = $apellido;
                $_SESSION['usuario'] = $usuario;
                $_SESSION['correo'] = $correo;

                header('Location: inicio.php');
                exit();
            }
        } catch (PDOException $e) {
            $error = 'Error en la base de datos: ' . $e->getMessage();
        }
    }
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

<div class="logo">
Viajero Mundial
</div>

<div class="login-container">

<h2>Crear cuenta</h2>

<?php if (!empty($error)): ?>
    <div style="background:#f8d7da;color:#721c24;padding:10px 14px;border-radius:6px;margin-bottom:16px;border:1px solid #f5c6cb;">
        <?php echo htmlspecialchars($error); ?>
    </div>
<?php endif; ?>

<form method="POST" action="registro.php">

<input type="text" name="nombre" placeholder="Nombre" required>

<input type="text" name="apellido" placeholder="Apellido" required>

<input type="text" name="usuario" placeholder="Usuario" required>

<input type="email" name="correo" placeholder="Correo electrónico" required>

<input type="password" id="password" name="password" placeholder="Contraseña" required>

<input type="password" id="confirmar" name="confirmar" placeholder="Confirmar contraseña" required>

<button type="submit">Registrarse</button>

</form>

<div class="register">
¿Ya tienes cuenta? <a href="login.php">Iniciar sesión</a>
</div>

</div>

<script src="/JS/registro.js"></script>

</body>
</html>