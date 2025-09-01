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
   git clone https://github.com/Juanico1/SistemaGestionTareas.git
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

---

# Uso de IA y material durante el desarrollo

En este proyecto utilicé herramientas de Inteligencia Artificial como apoyo en tareas específicas de planeación, productividad y documentación, por ejemplo:

- Planificar el desarollo del proyecto en un tiempo establecido
- Refinar la redacción de la documentación y comentarios JSDoc
- Generar ejemplos de `request` y `response` en Swagger
- Obtener guías paso a paso para validar datos con `express-validator`
- Sugerencias sobre buenas prácticas para estructurar el README

También el desarollo esta basado en los siguientes tutoriales

- API REST con Node js y Express | CRUD | MonkeyWit
- Curso API CRUD - Node.js, Express, MongoDB y Autenticación | FreeCodeCamp
- Construyendo una API Rest con Node JS + Express JS + TypeScript + TypeORM | Leonardo Jose
- Aprende a Documentar tu API Node.js con Swagger Autogen y Swagger UI Express | Leonardo Jose
 
# Prompts utilizados
- "Cómo estructurar un proyecto de una API para la gestión de tareas con CRUD (Crear, Leer, Actualizar, Eliminar) y un
sistema de autenticación y autorización"
- "Genera un ejemplo de esquema Mongoose para una entidad Task con campos title, description, dueDate y status"
- "Ejemplo de comentario @openapi para un endpoint GET por ID con parámetro en path"
- "Cómo organizar un README para un proyecto de API backend con secciones de instalación, uso, endpoints y ejemplos"
- "Cómo manejar errores globales en Express con un middleware centralizado"
- "Dame un ejemplo de JSON para crear un task en una API de gestión de tareas"
- "Cómo devolver mensajes de error personalizados en Express con express-validator"
- "Ejemplo de @openapi para un endpoint POST que crea un recurso en Swagger JSDoc"

Prueba técnica desarrollada por Juan Nicolás Sanabria Gómez
Contacto: juanicolas701@gmail.com | +57 3224052439


