# Recetario

Aplicación web para guardar, modificar y dar de baja lógica recetas de cocina.

## Stack

- **Frontend:** React 18 + Vite + Bootstrap 5 (SB Admin template)
- **Backend:** Node.js + Express
- **Base de datos:** MySQL

---

## Estructura de carpetas

```
recetario/
  ├── documentacion/
  │     └── README.md
  ├── backend/
  │     ├── routes/
  │     │     ├── categorias.js
  │     │     └── recetas.js
  │     ├── db.js
  │     ├── index.js
  │     ├── CLAUDE.md
  │     └── package.json
  └── frontend/
        ├── public/
        │     ├── assets/
        │     ├── css/
        │     └── js/
        ├── src/
        │     ├── components/
        │     │     ├── Layout.jsx
        │     │     └── ModalConfirmar.jsx
        │     ├── pages/
        │     │     ├── ListaRecetas.jsx
        │     │     ├── FormReceta.jsx
        │     │     └── DetalleReceta.jsx
        │     ├── services/
        │     │     └── api.js
        │     ├── App.jsx
        │     └── main.jsx
        ├── index.html
        ├── CLAUDE.md
        └── package.json
```

---

## Base de datos

Base de datos: `recetario`

### Tabla `categorias`

| Campo        | Tipo         | Descripción              |
|--------------|--------------|--------------------------|
| id_categoria | INT PK AI    | Identificador            |
| nombre       | VARCHAR(100) | Nombre de la categoría   |
| activo       | BOOL         | Baja lógica (default: 1) |

### Tabla `receta`

| Campo              | Tipo         | Descripción                        |
|--------------------|--------------|------------------------------------|
| id_receta          | INT PK AI    | Identificador                      |
| nombre             | VARCHAR(200) | Nombre de la receta                |
| descripcion        | TEXT         | Descripción breve                  |
| ingredientes       | TEXT         | Ingredientes (uno por línea)       |
| pasos              | TEXT         | Pasos de preparación               |
| tiempo_preparacion | INT          | Tiempo en minutos                  |
| id_categoria       | INT FK       | Referencia a `categorias`          |
| activo             | BOOL         | Baja lógica (default: 1)           |
| fecha_creacion     | DATETIME     | Se asigna automáticamente          |

---

## Componentes React

| Componente | Descripción |
|------------|-------------|
| `Layout` | Navbar + Sidebar + Footer, envuelve todas las páginas |
| `ModalConfirmar` | Modal reutilizable de confirmación de acciones |
| `ListaRecetas` | Listado con filtro por categoría y acciones |
| `FormReceta` | Alta y edición en un mismo componente |
| `DetalleReceta` | Vista completa de una receta |

---

## Endpoints del backend

Base URL: `http://localhost:3001`

| Método | Ruta                | Acción                        |
|--------|---------------------|-------------------------------|
| GET    | `/categorias`       | Lista categorías activas      |
| GET    | `/recetas`          | Lista recetas activas         |
| GET    | `/recetas/:id`      | Detalle de una receta         |
| POST   | `/recetas`          | Crear receta                  |
| PUT    | `/recetas/:id`      | Editar receta                 |
| PUT    | `/recetas/:id/baja` | Baja lógica de una receta     |

---

## Cómo correr el proyecto

### Base de datos
Ejecutar el script SQL en MySQL Workbench para crear la base y las tablas.

### Backend
```bash
cd backend
npm install
npm run dev
# corre en http://localhost:3001
```

> Configurar usuario y contraseña de MySQL en `backend/db.js`

### Frontend
```bash
cd frontend
npm install
npm run dev
# corre en http://localhost:5173
```
