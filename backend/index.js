const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// 1. Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de Viajero Mundial funcionando ⚽');
});


app.get('/api/partidos', async (req, res) => {
  try {
    const partidos = await prisma.partido.findMany({
      include: {
        equipo1: true,
        equipo2: true,
        estadio: {
          include: { ciudad: true }
        }
      }
    });
    res.json(partidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
});

app.get('/api/guia', async (req, res) => {
  try {
    const sitios = await prisma.sitio.findMany({
      include: { ciudad: true }
    });
    res.json(sitios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la guía' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});