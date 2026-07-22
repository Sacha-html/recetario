# Backend — Recetario

## Stack
- Node.js + Express
- mysql2 (con pool de conexiones y promesas)
- dotenv (variables de entorno)
- nodemon para desarrollo

## Comandos
```bash
npm run dev   # desarrollo (nodemon)
npm start     # producción
```

El servidor corre en `http://localhost:3001`.

## Estructura
```
backend/
  ├── routes/
  │     ├── categorias.js   # GET /categorias
  │     └── recetas.js      # CRUD /recetas
  ├── db.js                 # Pool de conexión MySQL
  ├── index.js              # Entry point, registro de rutas
  └── package.json
```

## Conexión a la base de datos
Archivo `db.js`. Usa `mysql2/promise` con `createPool`.
Las credenciales se leen desde variables de entorno usando `dotenv`.

Crear un archivo `.env` en la raíz de `backend/` con estas variables:
```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=recetario
```

> El archivo `.env` está en `.gitignore` y nunca se sube al repositorio.

## Tablas involucradas
- `categorias` — id_categoria, nombre, activo
- `receta` — id_receta, nombre, descripcion, ingredientes, pasos, tiempo_preparacion, id_categoria, activo, fecha_creacion

> Nota: la tabla se llama `receta` (singular), no `recetas`.

## Endpoints

| Método | Ruta                | Descripción                        |
|--------|---------------------|------------------------------------|
| GET    | `/categorias`       | Lista categorías activas           |
| GET    | `/recetas`          | Lista recetas activas con JOIN     |
| GET    | `/recetas/:id`      | Detalle completo de una receta     |
| POST   | `/recetas`          | Crear receta (body JSON)           |
| PUT    | `/recetas/:id`      | Editar receta (body JSON)          |
| PUT    | `/recetas/:id/baja` | Baja lógica (activo = 0)           |

## Convenciones
- Baja lógica: campo `activo` (BOOL). Nunca se eliminan registros.
- Validación mínima en el backend: `nombre` e `id_categoria` son obligatorios.
- Los `?` en las queries previenen SQL injection.
- `result.affectedRows === 0` se usa para detectar registros no encontrados en UPDATE.

## Body esperado en POST y PUT /recetas
```json
{
  "nombre": "Nombre de la receta",
  "descripcion": "Descripción breve",
  "ingredientes": "Un ingrediente por línea",
  "pasos": "1. Paso uno\n2. Paso dos",
  "tiempo_preparacion": 30,
  "id_categoria": 3
}
```
