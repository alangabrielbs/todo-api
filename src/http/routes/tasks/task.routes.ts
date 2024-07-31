import { Router } from "express";
import { createTask } from "./create-task";
import { getAllTasks } from "./list-all-tasks";

export const tasksRoutes = Router();

tasksRoutes.post("/tasks", createTask);
tasksRoutes.get("/tasks", getAllTasks);
