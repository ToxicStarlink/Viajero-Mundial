const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Prueba de conexión
app.get("/", (req, res) => {
  res.send("Servidor de Viajero Mundial funcionando ⚽");
});

//Partido inicio
app.get("/api/partidos", async (req, res) => {
  const partidos = await prisma.partido.findMany({
    include: {
      equipo1: true,
      equipo2: true,
      estadio: { include: { ciudad: true } },
    },
  });
  res.json(partidos);
});

//registro
app.post("/api/registro", async (req, res) => {
  const { nombre, apellido, correo, contraena } = req.body;

  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contraena: contraena,
      },
    });
    res.status(201).json({ mensaje: "Usuario creado", usuario: nuevoUsuario });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Este correo ya está registrado." });
    } else {
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
});

//login
app.post("/api/login", async (req, res) => {
  const { correo, contraena } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: correo },
    });

    if (usuario && usuario.contraena === contraena) {
      res.json({ mensaje: "¡Bienvenido!", usuario });
    } else {
      res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }

});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
