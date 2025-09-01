import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/auth.middleware";

//Create a task for an authenticated user

export const createTask = async (req: AuthRequest, res: Response) => {
    const { title, description, dueDate, status } = req.body;
    const task = await Task.create({
        owner: req.userId,
        title,
        description,
        dueDate,
        status
    });
    return res.status(201).json(task);
};

//Return all task from an authenticated user

export const getMyTasks = async (req: AuthRequest, res: Response) => {
    const tasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 });
    return res.json(tasks);
};

// Get a task by id, only if it belongs to the user

export const getTaskById = async (req: AuthRequest, res: Response) => {
    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    return res.json(task);
};

//Update an user task

export const updateTask = async (req: AuthRequest, res: Response) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, owner: req.userId },
        req.body,
        { new: true }
    );
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    return res.json(task);
};

//Delete an user task

export const deleteTask = async (req: AuthRequest, res: Response) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    return res.status(204).send();
};