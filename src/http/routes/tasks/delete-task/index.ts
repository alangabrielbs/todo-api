import { Request, Response } from "express";

import { knex } from "@/infra/database";
import { GetTaskParams } from "./schema";

export const deleteTask = async (req: Request, res: Response) => {
  const validateResult = GetTaskParams.safeParse(req.params);

  if (!validateResult.success) {
    res.status(400).json({
      fieldErrors: validateResult.error.flatten().fieldErrors,
    });

    return;
  }

  const sessionId = req.cookies.sessionId;

  const { id } = validateResult.data;

  if (!sessionId) {
    return res.status(404).send();
  }

  await knex("tasks")
    .where({
      id,
      session_id: sessionId,
    })
    .delete();

  return res.status(204).send();
};
