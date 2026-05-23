const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { z } = require("zod");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Prueba de conexión
app.get("/", (req, res) => {
  res.send("Servidor de Viajero Mundial funcionando ");
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
//validación registro

const registroSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  correo: z.string().email("Debe ser un correo electrónico válido"),
  contraena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

app.post("/api/registro", async (req, res) => {
  const validacion = registroSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).json({ 
      error: "Datos inválidos", 
      detalles: validacion.error.issues 
    });
  }

  const { nombre, apellido, correo, contraena } = validacion.data;

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
//Validación Login

const loginSchema = z.object({
  correo: z.string().email("Debe ser un correo electrónico válido"),
  contraena: z.string().min(1, "La contraseña es obligatoria"),
});

app.post("/api/login", async (req, res) => {
  const validacion = loginSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).json({ error: "Por favor envía un correo y contraseña válidos" });
  }

  const { correo, contraena } = validacion.data;


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

// Actualizar usuario
app.put("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, contraena } = req.body;

  // Validar que el ID sea un número válido
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID de usuario inválido." });
  }

  try {
    const data = { nombre, apellido, correo };
    
    // Actualizar contraseña
    if (contraena) {
      data.contraena = contraena;
    }


    const usuario = await prisma.usuario.update({
      where: { id_usuario: userId },
      data,
    });

    res.json({ mensaje: "Usuario actualizado con éxito", usuario });
  } catch (error) {
    console.error("Error al actualizar usuario en BD:", error); 
    if (error.code === "P2002") {
      res.status(400).json({ error: "Este correo ya está en uso por otra cuenta." });
    } else if (error.code === "P2025") {
      res.status(404).json({ error: "Usuario no encontrado en la base de datos." });
    } else {
      res.status(500).json({ error: "Error interno al actualizar el usuario." });
    }
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

// Obtener países para la Guía Turística
app.get("/api/paises", async (req, res) => {
  try {
    const paises = await prisma.pais.findMany({
      include: {
        ciudades: {
          include: {
            estadios: true,
            sitios: true,
          },
        },
      },
    });
    res.json(paises);
  } catch (error) {
    console.error("Error al obtener países:", error);
    res.status(500).json({ error: "Error al obtener la guía turística" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
