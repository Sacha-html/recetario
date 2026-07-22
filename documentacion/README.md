# Documentación del Proyecto — Recetario

¡Bienvenido a la documentación oficial de la aplicación **Recetario**! Aquí encontrarás toda la información técnica necesaria para comprender, ejecutar y continuar desarrollando el proyecto.

---

## 📌 Índice de Documentación Especializada

Para facilitar la lectura y el mantenimiento, la documentación se divide en tres módulos principales de arquitectura, más el script de inicialización de datos:

1. 💻 **[Documentación del Frontend (front.md)](file:///c:/Users/sacha/OneDrive/Escritorio/Lboratorio/recetario/documentacion/front.md)**
   * Librerías y dependencias del cliente (React, Bootstrap, Vite).
   * Arquitectura del frontend (Single Page Application, enrutador, flujo de datos).
   * Maquetación y diseño visual de las vistas (Login, Listado, Detalle, Formulario).
   * Validaciones e interactividad de la UI.

2. ⚙️ **[Documentación del Backend (back.md)](file:///c:/Users/sacha/OneDrive/Escritorio/Lboratorio/recetario/documentacion/back.md)**
   * Librerías y dependencias del servidor (Express, mysql2, dotenv).
   * Arquitectura de la API REST y pool de conexiones.
   * Detalle de endpoints HTTP (métodos, rutas, payloads y respuestas).
   * Convenciones de desarrollo (esquema de baja lógica, seguridad contra SQL injection).

3. 🗄️ **[Documentación de la Base de Datos (base.md)](file:///c:/Users/sacha/OneDrive/Escritorio/Lboratorio/recetario/documentacion/base.md)**
   * Arquitectura y codificación del motor relacional MySQL.
   * Diagrama Entidad-Relación (ERD) en formato Mermaid.
   * Diccionario de datos detallado para cada tabla (`usuarios`, `categorias`, `receta`).

4. 📄 **[Script SQL de Inicialización (base_de_datos.md)](file:///c:/Users/sacha/OneDrive/Escritorio/Lboratorio/recetario/documentacion/base_de_datos.md)**
   * Script completo (DDL & DML) para crear la base de datos, las tablas y poblar las semillas de prueba (categorías por defecto, usuario administrador y recetas precargadas).

---

## 📂 Estructura General del Repositorio

El proyecto está organizado en una estructura monorrepiso simple (frontend y backend en carpetas separadas):

```
recetario/
├── documentacion/          # Archivos de documentación (markdown)
│   ├── README.md           # Índice principal (este archivo)
│   ├── front.md            # Documentación del Frontend (React)
│   ├── back.md             # Documentación del Backend (Express)
│   ├── base.md             # Documentación del Modelo de Datos (MySQL)
│   └── base_de_datos.md    # Script DDL/DML de inicialización SQL
├── backend/                # API REST
│   ├── routes/             # Módulos de rutas Express
│   ├── db.js               # Conexión/Pool a base de datos
│   ├── index.js            # Punto de entrada de la API
│   └── package.json        # Dependencias y scripts del backend
└── frontend/               # Cliente web (SPA)
    ├── public/             # Archivos estáticos y estilos globales
    ├── src/                # Código fuente en React
    │   ├── assets/         # Recursos visuales (imágenes, logos)
    │   ├── components/     # Componentes compartidos e infraestructura
    │   ├── pages/          # Páginas/vistas del flujo de navegación
    │   ├── services/       # Conectores de red (API call wrappers)
    │   ├── App.jsx         # Configuración de rutas
    │   └── main.jsx        # Renderizador de la SPA
    └── package.json        # Dependencias y scripts del frontend
```

---

## 🚀 Guía de Inicio Rápido (Cómo correr el proyecto)

### Paso 1: Configurar la Base de Datos
1. Asegúrate de tener instalado y activo un servidor **MySQL 8.0+**.
2. Abre tu cliente SQL favorito (ej. MySQL Workbench) y conéctate al servidor.
3. Copia el script completo ubicado en **[base_de_datos.md](file:///c:/Users/sacha/OneDrive/Escritorio/Lboratorio/recetario/documentacion/base_de_datos.md)**, pégalo en una pestaña de query y ejecútalo. Esto configurará el esquema de tablas y cargará las recetas iniciales.

### Paso 2: Configurar y Levantar el Backend
1. Abre una terminal y navega hasta el directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz de la carpeta `backend/` con las credenciales de tu base de datos:
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contrasenia
   DB_NAME=recetario
   ```
4. Inicia el servidor en modo desarrollo (utiliza `nodemon`):
   ```bash
   npm run dev
   ```
   *El servidor correrá en `http://localhost:3001`.*

### Paso 3: Configurar y Levantar el Frontend
1. Abre otra ventana de terminal y dirígete al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```
   *La aplicación abrirá por defecto en `http://localhost:5173` o el puerto que te indique la consola.*

---

## 📋 Resumen Rápido de Componentes y Endpoints

### Componentes de la Interfaz (Frontend)
* `Login`: Formulario con estilo vidrio esmerilado y validación de acceso.
* `ListaRecetas`: Tabla de visualización principal con filtro interactivo por categoría.
* `DetalleReceta`: Ficha técnica de ingredientes (en columna izquierda) y pasos de preparación (columna derecha).
* `FormReceta`: Formulario reactivo reutilizable para dar de alta o editar recetas, con validaciones dinámicas.
* `Layout`: Barra de navegación fija con logo, menú y botón "Salir", y un footer.
* `RutaProtegida`: Verifica la existencia del token en el navegador antes de dar acceso.
* `ModalConfirmar`: Ventana emergente utilizada para confirmar la baja lógica de una receta.

### Endpoints del Servidor (Backend)
* `POST /auth/login`: Autentica al usuario.
* `GET /categorias`: Devuelve la lista de categorías de comida activas.
* `GET /recetas`: Obtiene todas las recetas activas (`activo = 1`).
* `GET /recetas/:id`: Obtiene el detalle de una receta particular activa.
* `POST /recetas`: Inserta una nueva receta.
* `PUT /recetas/:id`: Actualiza los datos de una receta existente.
* `PUT /recetas/:id/baja`: Cambia el estado `activo` a `0` (baja lógica).
