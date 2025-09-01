import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error.middleware";

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

export default app;