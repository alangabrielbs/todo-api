import { Request, Response } from "express";

import { knex } from "@/infra/database";

export const getAllTasks = async (req: Request, res: Response) => {
  const sessionId = req.cookies.sessionId;

  const tasksResult = knex("tasks").where("session_id", sessionId).select();
  const incompleteTasksResult = knex("tasks")
    .where({
      done: false,
      session_id: sessionId,
    })
    .count<[{ count: string }]>("* as count");
  const completeTasksResult = knex("tasks")
    .where({
      done: true,
      session_id: sessionId,
    })
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
