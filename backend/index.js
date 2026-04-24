const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

//Prueba de conexión
app.get('/', (req, res) => {
  res.send('Servidor de Viajero Mundial funcionando ⚽');
});

//Partido inicio
app.get('/api/partidos', async (req, res) => {
  const partidos = await prisma.partido.findMany({
    include: {
      equipo1: true,
      equipo2: true,
      estadio: { include: { ciudad: true } }
    }
  });
  res.j;
});


son(partidos)


app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});