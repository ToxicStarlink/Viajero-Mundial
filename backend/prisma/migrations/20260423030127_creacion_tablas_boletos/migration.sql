-- CreateTable
CREATE TABLE "Pais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fk_pais" INTEGER NOT NULL,
    CONSTRAINT "Ciudad_fk_pais_fkey" FOREIGN KEY ("fk_pais") REFERENCES "Pais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sitio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "id_ciudad" INTEGER NOT NULL,
    CONSTRAINT "Sitio_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "Ciudad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estadio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "fk_ciudad" INTEGER NOT NULL,
    CONSTRAINT "Estadio_fk_ciudad_fkey" FOREIGN KEY ("fk_ciudad") REFERENCES "Ciudad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Zona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EstadioZona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precio" DECIMAL NOT NULL,
    "fk_zona" INTEGER NOT NULL,
    "fk_estadio" INTEGER NOT NULL,
    CONSTRAINT "EstadioZona_fk_zona_fkey" FOREIGN KEY ("fk_zona") REFERENCES "Zona" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EstadioZona_fk_estadio_fkey" FOREIGN KEY ("fk_estadio") REFERENCES "Estadio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fk_pais" INTEGER NOT NULL,
    CONSTRAINT "Equipos_fk_pais_fkey" FOREIGN KEY ("fk_pais") REFERENCES "Pais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Partido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "hora" TEXT NOT NULL,
    "fk_estadio" INTEGER NOT NULL,
    "fk_equipo1" INTEGER NOT NULL,
    "fk_equipo2" INTEGER NOT NULL,
    CONSTRAINT "Partido_fk_estadio_fkey" FOREIGN KEY ("fk_estadio") REFERENCES "Estadio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_fk_equipo1_fkey" FOREIGN KEY ("fk_equipo1") REFERENCES "Equipos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_fk_equipo2_fkey" FOREIGN KEY ("fk_equipo2") REFERENCES "Equipos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contraena" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Boleto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "asiento" TEXT NOT NULL,
    "fk_partido" INTEGER NOT NULL,
    "fk_estadio_zona" INTEGER NOT NULL,
    "fk_usuario" INTEGER NOT NULL,
    CONSTRAINT "Boleto_fk_partido_fkey" FOREIGN KEY ("fk_partido") REFERENCES "Partido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Boleto_fk_estadio_zona_fkey" FOREIGN KEY ("fk_estadio_zona") REFERENCES "EstadioZona" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Boleto_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
