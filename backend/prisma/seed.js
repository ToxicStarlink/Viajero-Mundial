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
  const tbr = await prisma.equipos.create({ data: { nombre: 'Brasil', fk_pais: usa.id } });
  const tar = await prisma.equipos.create({ data: { nombre: 'Argentina', fk_pais: usa.id } });
  const tfr = await prisma.equipos.create({ data: { nombre: 'Francia', fk_pais: canada.id } });
  const tes = await prisma.equipos.create({ data: { nombre: 'España', fk_pais: mexico.id } }); // Paises dummy para el ejemplo
  const tal = await prisma.equipos.create({ data: { nombre: 'Alemania', fk_pais: canada.id } });
  const tur = await prisma.equipos.create({ data: { nombre: 'Uruguay', fk_pais: mexico.id } });
  const tco = await prisma.equipos.create({ data: { nombre: 'Colombia', fk_pais: usa.id } });

  // 8. PARTIDOS
  const partido1 = await prisma.partido.create({
    data: {
      nombre: 'Brasil vs Francia',
      fecha: new Date('2026-06-11T20:00:00Z'),
      hora: '20:00',
      fk_estadio: azteca.id,
      fk_equipo1: tbr.id,
      fk_equipo2: tfr.id
    }
  });
  await prisma.partido.create({
    data: {
      nombre: 'Uruguay vs Colombia',
      fecha: new Date('2026-06-12T18:00:00Z'),
      hora: '18:00',
      fk_estadio: hardRock.id,
      fk_equipo1: tur.id,
      fk_equipo2: tco.id
    }
  });

  await prisma.partido.create({
    data: {
      nombre: 'Argentina vs Alemania',
      fecha: new Date('2026-06-13T19:00:00Z'),
      hora: '19:00',
      fk_estadio: bba.id,
      fk_equipo1: tar.id,
      fk_equipo2: tal.id
    }
  });
  await prisma.partido.create({
    data: {
      nombre: 'Argentina vs Suiza',
      fecha: new Date('2026-07-10T15:00:00Z'),
      hora: '15:00',
      fk_estadio: azteca.id,
      fk_equipo1: tar.id,
      fk_equipo2: tfr.id 
    }
  });

  await prisma.partido.create({
    data: {
      nombre: 'Brasil vs Inglaterra',
      fecha: new Date('2026-07-16T17:00:00Z'),
      hora: '17:00',
      fk_estadio: hardRock.id,
      fk_equipo1: tbr.id,
      fk_equipo2: tal.id 
    }
  });

  await prisma.partido.create({
    data: {
      nombre: 'México vs Brasil',
      fecha: new Date('2026-07-12T21:00:00Z'),
      hora: '21:00',
      fk_estadio: bba.id,
      fk_equipo1: tmx.id,
      fk_equipo2: tbr.id
    }
  });

  // 9. USUARIOS (Tus 2 usuarios iniciales)
  const user1 = await prisma.usuario.upsert({
    where: { correo: 'anonimos@ejemplo.com' },
    update: {},
    create: {
      nombre: 'Anonimos',
      apellido: 'none',
      correo: 'anonimos@ejemplo.com',
      contraena: '123456'
    }
  });

  const user2 = await prisma.usuario.upsert({
    where: { correo: 'juan@ejemplo.com' },
    update: {},
    create: {
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