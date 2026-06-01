Requisitos
MySQL 8+

MySQL Workbench o cliente equivalente

Ejecución
Abrí MySQL Workbench, copiá el script y ejecutalo completo con Ctrl + Shift + Enter.

Script
SQL
-- ============================================
-- RECETARIO - Script de base de datos MySQL
-- ============================================

CREATE DATABASE IF NOT EXISTS recetario 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE recetario;

-- --------------------------------------------
-- Tabla: categorias
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL,
  activo       BOOL NOT NULL DEFAULT 1
);

-- --------------------------------------------
-- Tabla: usuarios
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  activo BOOL NOT NULL DEFAULT 1,
  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------
-- Tabla: receta
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS receta (
  id_receta          INT AUTO_INCREMENT PRIMARY KEY,
  nombre             VARCHAR(200) NOT NULL,
  descripcion        TEXT,
  ingredientes       TEXT,
  pasos              TEXT,
  tiempo_preparacion INT,
  id_categoria       INT NOT NULL,
  id_usuario         INT NOT NULL,
  activo             BOOL NOT NULL DEFAULT 1,
  fecha_creacion     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
  CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- --------------------------------------------
-- Datos iniciales: categorias
-- --------------------------------------------
INSERT INTO categorias (nombre) VALUES
  ('Entrada'),
  ('Sopa'),
  ('Plato principal'),
  ('Guarnición'),
  ('Postre'),
  ('Desayuno / Merienda');

-- --------------------------------------------
-- Datos iniciales: usuarios (Admin base)
-- --------------------------------------------
INSERT INTO usuarios (email, password) 
VALUES ('Admin@gmail.com', '1234!');

-- --------------------------------------------
-- Datos de ejemplo: recetas
-- Nota: id_usuario = 1 corresponde al Admin
-- --------------------------------------------
INSERT INTO receta (nombre, descripcion, ingredientes, pasos, tiempo_preparacion, id_categoria, id_usuario)
VALUES (
  'Milanesa a la napolitana',
  'Clásica milanesa con salsa, jamón y queso.',
  'Milanesas de ternera\nSalsa de tomate\nJamón\nMozzarella\nHuevo y pan rallado',
  '1. Rebozar y freír las milanesas.\n2. Colocar en asadera con salsa, jamón y queso.\n3. Hornear 10 minutos hasta gratinar.',
  40,
  3,
  1
);

INSERT INTO receta (nombre, descripcion, ingredientes, pasos, tiempo_preparacion, id_categoria, id_usuario)
VALUES (
  'Ñoquis de papa',
  'Ñoquis caseros de papa con salsa a elección.',
  '1 kg de papas\n300g de harina\n1 huevo\nSal a gusto',
  '1. Hervir las papas con cáscara hasta que estén tiernas.\n2. Pelar y pisar las papas en caliente.\n3. Agregar el huevo, sal y la harina de a poco.\n4. Amasar hasta formar un bollo tierno que no se pegue.\n5. Formar rollitos y cortar los ñoquis.\n6. Hervir en agua con sal hasta que suban a la superficie.',
  45,
  3,
  1
);
Notas
BOOL es equivalente a TINYINT(1) en MySQL. Los valores 1 y 0 representan activo e inactivo respectivamente.

TEXT es equivalente a VARCHAR(MAX) en SQL Server.

La baja lógica se maneja con el campo activo. Nunca se eliminan registros (Soft delete pattern).

La tabla se llama receta (singular) y ahora requiere obligatoriamente estar vinculada a un id_usuario.

El campo email en la tabla usuarios tiene la restricción UNIQUE para prevenir registros duplicados a nivel de motor de base de datos.