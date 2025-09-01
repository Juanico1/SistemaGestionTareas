import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API for the SENA internal tools task test"
    },
    servers: [
      { url: "http://localhost:4000", description: "Local server" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      },
      schemas: {
        Task: {
          type: "object",
          properties: {
            _id: { type: "string" },
            owner: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            dueDate: { type: "string", format: "date-time" },
            status: { type: "string", enum: ["pending","in_progress","done"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        TaskInput: {
          type: "object",
          required: ["title", "dueDate"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            dueDate: { type: "string", format: "date-time" },
            status: { type: "string", enum: ["pending","in_progress","done"] }
          }
        },
        AuthLogin: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" }
          }
        },
        AuthToken: {
          type: "object",
          properties: {
            token: { type: "string" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// health check to check if API is working
app.get("/health", (_req, res) => res.json({ ok: true }));

// routes
app.use("/api/auth", authRoutes);
// las rutas de tasks las protegemos con middleware auth
app.use("/api/tasks", taskRoutes);

// middleware de errores al final
app.use(errorHandler);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;