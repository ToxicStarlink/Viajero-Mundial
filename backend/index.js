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

// obtener partido por id 
app.get("/api/partidos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const partido = await prisma.partido.findUnique({
      where: { id: parseInt(id) },
      include: {
        equipo1: true,
        equipo2: true,
        estadio: {
          include: { ciudad: true }
        },
      },
    });

    if (partido) {
      res.json(partido);
    } else {
      res.status(404).json({ error: "Partido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el partido" });
  }
});

app.get("/api/detalles-zona", async (req, res) => {
  const { id_estadio, tipo_zona } = req.query;

  try {
    const detalle = await prisma.estadioZona.findFirst({
      where: {
        fk_estadio: parseInt(id_estadio),
        zona: {
          tipo: tipo_zona 
        }
      },
      include: {
        zona: true
      }
    });

    if (detalle) {
      res.json(detalle);
    } else {
      res.status(404).json({ error: "Zona no encontrada en este estadio" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener detalles de la zona" });
  }
});

// compra de boletos
app.post("/api/comprar-boletos", async (req, res) => {
  const { fk_usuario, fk_partido, fk_estadio_zona, asientos } = req.body;

  try {
    const compras = await Promise.all(
      asientos.map((asiento) =>
        prisma.boleto.create({
          data: {
            asiento: asiento,
            fk_usuario: parseInt(fk_usuario),
            fk_partido: parseInt(fk_partido),
            fk_estadio_zona: parseInt(fk_estadio_zona),
          },
        })
      )
    );

    res.status(201).json({ mensaje: "¡Compra realizada con éxito!", boletos: compras });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo procesar la compra." });
  }
});

app.get("/api/usuarios/:id/boletos", async (req, res) => {
  const { id } = req.params;
  
  try {
    const boletos = await prisma.boleto.findMany({
      where: { 
        fk_usuario: parseInt(id) 
      },
      include: {
        partido: true,
        estadio_zona: true 
      }
    });

    res.json(boletos);
  } catch (error) {
    console.error("Error obteniendo boletos:", error);
    res.status(500).json({ error: "Error al obtener historial de boletos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
