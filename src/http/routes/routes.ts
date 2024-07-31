import { Router } from "express";
import { tasksRoutes } from "./tasks/task.routes";

export const routes = Router();

routes.use(tasksRoutes);
