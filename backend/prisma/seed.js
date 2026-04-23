const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el sembrado de datos (Seed)... 🌱');

  // 1. PAÍSES
  const mexico = await prisma.pais.create({ data: { nombre: 'México' } });
  const usa = await prisma.pais.create({ data: { nombre: 'USA' } });
  const canada = await prisma.pais.create({ data: { nombre: 'Canadá' } });

  // 2. CIUDADES
  const cdmx = await prisma.ciudad.create({ data: { nombre: 'CDMX', fk_pais: mexico.id } });
  const monterrey = await prisma.ciudad.create({ data: { nombre: 'Monterrey', fk_pais: mexico.id } });
  const miami = await prisma.ciudad.create({ data: { nombre: 'Miami', fk_pais: usa.id } });
  const vancouver = await prisma.ciudad.create({ data: { nombre: 'Vancouver', fk_pais: canada.id } });

  // 3. SITIOS (Guía turística)
  await prisma.sitio.createMany({
    data: [
      { nombre: 'Castillo de Chapultepec', tipo: 'Museo', descripcion: 'Un castillo histórico con vistas increíbles.', ubicacion: 'CDMX', id_ciudad: cdmx.id },
      { nombre: 'Parque Fundidora', tipo: 'Parque', descripcion: 'Antigua fundidora convertida en parque.', ubicacion: 'Monterrey', id_ciudad: monterrey.id },
      { nombre: 'South Beach', tipo: 'Playa', descripcion: 'Famosa playa con estilo Art Deco.', ubicacion: 'Miami', id_ciudad: miami.id }
    ]
  });

  // 4. ESTADIOS
  const azteca = await prisma.estadio.create({ data: { nombre: 'Estadio Azteca', capacidad: 87000, fk_ciudad: cdmx.id } });
  const bba = await prisma.estadio.create({ data: { nombre: 'Estadio BBVA', capacidad: 53000, fk_ciudad: monterrey.id } });
  const hardRock = await prisma.estadio.create({ data: { nombre: 'Hard Rock Stadium', capacidad: 65000, fk_ciudad: miami.id } });

  // 5. ZONAS (Para los boletos)
  const vip = await prisma.zona.create({ data: { tipo: 'VIP' } });
  const general = await prisma.zona.create({ data: { tipo: 'General' } });

  // 6. ESTADIO_ZONA (Precios por zona en cada estadio)
  const aztecaVip = await prisma.estadioZona.create({ data: { precio: 500.00, fk_zona: vip.id, fk_estadio: azteca.id } });
  const bbaGeneral = await prisma.estadioZona.create({ data: { precio: 150.00, fk_zona: general.id, fk_estadio: bba.id } });

  // 7. EQUIPOS
  const tmx = await prisma.equipos.create({ data: { nombre: 'México', fk_pais: mexico.id } });
  const tbr = await prisma.equipos.create({ data: { nombre: 'Brasil', fk_pais: usa.id } }); // Paises dummy
  const tar = await prisma.equipos.create({ data: { nombre: 'Argentina', fk_pais: usa.id } });
  const tfr = await prisma.equipos.create({ data: { nombre: 'Francia', fk_pais: canada.id } });

  // 8. PARTIDOS
  const partido1 = await prisma.partido.create({
    data: {
      nombre: 'Gran Inauguración',
      fecha: new Date('2026-06-11T20:00:00Z'),
      hora: '20:00',
      fk_estadio: azteca.id,
      fk_equipo1: tmx.id,
      fk_equipo2: tbr.id
    }
  });

  const partido2 = await prisma.partido.create({
    data: {
      nombre: 'Clásico de las Américas',
      fecha: new Date('2026-06-15T18:00:00Z'),
      hora: '18:00',
      fk_estadio: hardRock.id,
      fk_equipo1: tar.id,
      fk_equipo2: tbr.id
    }
  });

  // 9. USUARIOS (Tus 2 usuarios iniciales)
  const user1 = await prisma.usuario.create({
    data: {
      nombre: 'Anonimos',
      apellido: 'none',
      correo: 'anonimos@ejemplo.com',
      contraena: '123456' // Nota: En producción usa bcrypt
    }
  });

  const user2 = await prisma.usuario.create({
    data: {
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan@ejemplo.com',
      contraena: 'password'
    }
  });

  // 10. BOLETOS
  await prisma.boleto.create({
    data: {
      asiento: 'A-12',
      fk_partido: partido1.id,
      fk_estadio_zona: aztecaVip.id,
      fk_usuario: user1.id_usuario
    }
  });

  console.log('¡Datos sembrados con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });