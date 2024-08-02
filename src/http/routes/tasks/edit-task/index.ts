import { Request, Response } from "express";
import crypto from "node:crypto";

import { knex } from "@/infra/database";
import { createSafeRequest } from "@/lib/create-safe-request";
import { EditTaskParams, EditTaskSchema } from "./schema";
import { CreateTaskParams } from "./types";

const handle = async (req: Request, res: Response, data: CreateTaskParams) => {
  const validateResult = EditTaskParams.safeParse(req.params);

  if (!validateResult.success) {
    res.status(400).json({
      fieldErrors: validateResult.error.flatten().fieldErrors,
    });
    return;
  }

  const { id } = validateResult.data;

  const { title, description, done, duration } = data;
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    res.status(401).json({
      message: "Não autorizado",
    });

    return;
  }

  const task = await knex("tasks")
    .update({
      title,
      description,
      done,
      duration,
    })
    .where({
      id,
      session_id: sessionId,
    })
    .returning("*");

  res.status(200).json({
    task: task[0],
  });
};

export const editTask = createSafeRequest(EditTaskSchema, handle);
