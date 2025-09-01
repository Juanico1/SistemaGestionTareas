import { Router } from "express";
import { body, param } from "express-validator";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/error.middleware";
import {
    createTask, getMyTasks, getTaskById, updateTask, deleteTask
} from "../controllers/task.controller";

const r = Router();

// All routes require JWT
r.use(requireAuth);

//GET /api/tasks  -> User Task List
r.get("/", getMyTasks);

//GET /api/tasks/:id -> Task by user id
r.get("/:id",
    param("id").isMongoId(),
    validate,
    getTaskById
);

//POST /api/tasks -> Create a task

r.post("/",
    body("title").isString().notEmpty(),
    body("description").optional().isString(),
    body("dueDate").isISO8601(), // ej: "2025-09-01"
    body("status").optional().isIn(["pending", "in_progress", "done"]),
    validate,
    createTask
);

//PUT /api/tasks/:id -> Update User Task

r.put("/:id",
    param("id").isMongoId(),
    body("title").optional().isString(),
    body("description").optional().isString(),
    body("dueDate").optional().isISO8601(),
    body("status").optional().isIn(["pending", "in_progress", "done"]),
    validate,
    updateTask
);

//DELETE /api/tasks/:id -> Delete User Task

r.delete("/:id",
    param("id").isMongoId(),
    validate,
    deleteTask
);

export default r;