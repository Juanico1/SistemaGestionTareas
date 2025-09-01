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
/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Get all tasks of the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
r.get("/", getMyTasks);

//GET /api/tasks/:id -> Task by user id
/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID (only if it belongs to the authenticated user)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the task
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
r.get("/:id",
    param("id").isMongoId(),
    validate,
    getTaskById
);

//POST /api/tasks -> Create a task
/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Created task
 */
r.post("/",
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("description").optional().isString(),
    body("dueDate").isISO8601().withMessage("dueDate must be ej:2025-09-01"), 
    body("status").optional().isIn(["pending", "in_progress", "done"]),
    validate,
    createTask
);

//PUT /api/tasks/:id -> Update User Task
/**
 * @openapi
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Updated task
 *       404:
 *         description: Task not found
 */
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
/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the task
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
r.delete("/:id",
    param("id").isMongoId(),
    validate,
    deleteTask
);

export default r;