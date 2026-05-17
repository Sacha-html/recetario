# Frontend — Recetario

## Stack
- React 18 + Vite
- React Router DOM v6
- Bootstrap 5 (via npm)
- SB Admin template (archivos estáticos en /public)

## Comandos
```bash
npm run dev     # desarrollo
npm run build   # producción
```

El frontend corre en `http://localhost:5173`.
El backend debe estar corriendo en `http://localhost:3001`.

## Estructura
```
frontend/
  ├── public/
  │     ├── assets/
  │     ├── css/
  │     │     └── styles.css       # CSS del template SB Admin
  │     └── js/
  ├── src/
  │     ├── components/
  │     │     ├── Layout.jsx        # Navbar + Sidebar + Footer (envuelve todas las páginas)
  │     │     └── ModalConfirmar.jsx # Modal reutilizable de confirmación
  │     ├── pages/
  │     │     ├── ListaRecetas.jsx  # Página principal con tabla y filtro
  │     │     ├── FormReceta.jsx    # Alta y edición de recetas (mismo componente)
  │     │     └── DetalleReceta.jsx # Vista detallada de una receta
  │     ├── services/
  │     │     └── api.js            # Todas las llamadas al backend centralizadas
  │     ├── App.jsx                 # Configuración de rutas
  │     └── main.jsx                # Entry point, importa Bootstrap
  ├── index.html
  └── package.json
```

## Rutas

| Path | Componente | Descripción |
|------|------------|-------------|
| `/` | `ListaRecetas` | Listado de recetas activas con filtro por categoría |
| `/nueva` | `FormReceta` | Formulario de alta |
| `/editar/:id` | `FormReceta` | Formulario de edición pre-cargado |
| `/receta/:id` | `DetalleReceta` | Vista detallada de una receta |

## Componentes y páginas

### Layout.jsx
Envuelve todas las páginas. Contiene navbar superior, sidebar con links de navegación y footer. Recibe `{children}` que es el contenido de cada página.

### ModalConfirmar.jsx
Modal reutilizable de confirmación. Recibe tres props:
- `mensaje` — texto que muestra el modal
- `onConfirmar` — función que se ejecuta al confirmar
- `onCancelar` — función que se ejecuta al cancelar

### ListaRecetas.jsx
- Trae recetas y categorías en paralelo con `Promise.all`
- Combo de filtro por categoría llenado desde la BD
- Botones de editar (navega a `/editar/:id`) y dar de baja (abre modal)
- Usa `recetaSeleccionada` para saber qué receta se está dando de baja

### FormReceta.jsx
- Detecta si es alta o edición según si existe `id` en los params (`useParams`)
- En edición pre-carga el formulario con `getReceta(id)`
- El combo de categorías siempre se llena desde la BD
- Al guardar navega automáticamente al listado

### DetalleReceta.jsx
- Muestra todos los campos de la receta
- Ingredientes y pasos se renderizan línea por línea usando `split('\n')`
- Tiene botones de editar y dar de baja con modal de confirmación

## Hooks utilizados por página

| Página | Hooks |
|--------|-------|
| `ListaRecetas` | `useState`, `useEffect`, `useNavigate` |
| `FormReceta` | `useState`, `useEffect`, `useParams`, `useNavigate` |
| `DetalleReceta` | `useState`, `useEffect`, `useParams`, `useNavigate` |

## Comunicación con el backend
Toda la comunicación está centralizada en `src/services/api.js`.
La URL base es `http://localhost:3001`.

| Función | Método | Endpoint |
|---------|--------|----------|
| `getCategorias()` | GET | `/categorias` |
| `getRecetas()` | GET | `/recetas` |
| `getReceta(id)` | GET | `/recetas/:id` |
| `crearReceta(data)` | POST | `/recetas` |
| `editarReceta(id, data)` | PUT | `/recetas/:id` |
| `bajaReceta(id)` | PUT | `/recetas/:id/baja` |
