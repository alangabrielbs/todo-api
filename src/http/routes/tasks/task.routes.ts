import { Router } from "express";
import { createTask } from "./create-task";

export const tasksRoutes = Router();

tasksRoutes.post("/tasks", createTask);
