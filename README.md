# Task Management API

API RESTful desarrollada con **Node.js, Express, TypeScript y MongoDB** como parte de la prueba técnica para **Aprendiz SENA Backend Developer** en Instaleap.  
El proyecto implementa autenticación JWT, validación de datos y documentación interactiva con Swagger

---

# Características principales

- Registro y autenticación de usuarios (`/api/auth/register`, `/api/auth/login`)
- Manejo de tareas (CRUD):
  - Crear una tarea
  - Listar tareas del usuario autenticado
  - Obtener tarea por ID
  - Actualizar tarea
  - Eliminar tarea
- Validación de datos con **express-validator**.
- Autenticación con **JWT** (Bearer token).
- Documentación interactiva con **Swagger UI** en `/docs`

---

# Tecnologías usadas

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Express Validator
- Swagger JSDoc + Swagger UI
- 
---

# Estructura del proyecto

├── src/
│ ├── config/ # Conexión base de datos
│ ├── controllers/ # Lógica de negocio (auth, tasks)
│ ├── middleware/ # Middlewares (auth, validación, errores)
│ ├── models/ # Modelos de Mongoose (User, Task)
│ ├── routes/ # Definición de endpoints
│ ├── app.ts # Configuración de Express
│ └── index.ts # Punto de entrada
├── types/ # Tipos personalizados para TS
├── .env.example # Variables de entorno de ejemplo
├── package.json
├── tsconfig.json
└── README.md

---

# Instalación del Proyecto

1. Clonar el repositorio:
   git clone https://github.com/tuusuario/SistemaGestionTareas.git
   cd SistemaGestionTareas

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno:
Copia .env.example a .env y completa los valores:

PORT=4000
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=tu_clave

4. Compilar y ejecutar en modo desarrollo:
npm run dev

---

# Documentación Interactiva 

La documentación interactiva está disponible en: **http://localhost:PORT/docs**, haz clic en Authorize e ingresa tu token JWT
(solo la cadena, sin Bearer )Luego podrás probar todos los endpoints desde Swagger UI

---

# Endpoints principales

**Auth**

  POST /api/auth/register → Crear usuario
  
  POST /api/auth/login → Obtener token

**Tasks**

  GET /api/tasks → Listar tareas
  
  GET /api/tasks/:id → Obtener tarea por ID
  
  POST /api/tasks → Crear tarea
  
  PUT /api/tasks/:id → Actualizar tarea
  
  DELETE /api/tasks/:id → Eliminar tarea




