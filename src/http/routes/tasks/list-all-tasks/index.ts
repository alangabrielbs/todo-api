import { Request, Response } from "express";

import { knex } from "@/infra/database";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasksResult = knex("tasks").select();
  const incompleteTasksResult = knex("tasks")
    .where("done", false)
    .count<[{ count: string }]>("* as count");
  const completeTasksResult = knex("tasks")
    .where("done", true)
    .count<[{ count: string }]>("* as count");

  const [tasks, incompleteTasks, completeTasks] = await Promise.all([
    tasksResult,
    incompleteTasksResult,
    completeTasksResult,
  ]);

  const incompleteTasksCount = parseInt(incompleteTasks[0].count, 10);
  const completeTasksCount = parseInt(completeTasks[0].count, 10);
  const transformedTasks = tasks.map((task) => ({
    ...task,
    done: Boolean(task.done),
  }));

  res.json({
    completeTasks: completeTasksCount,
    incompleteTasks: incompleteTasksCount,
    tasks: transformedTasks,
  });
};
