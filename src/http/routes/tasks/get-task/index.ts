import { Request, Response } from "express";

import { knex } from "@/infra/database";
import { GetTaskParams } from "./schema";

export const getTask = async (req: Request, res: Response) => {
  const validateResult = GetTaskParams.safeParse(req.params);

  if (!validateResult.success) {
    res.status(400).json({
      fieldErrors: validateResult.error.flatten().fieldErrors,
    });
    return;
  }

  const { id } = validateResult.data;

  const task = await knex("tasks").where("id", id).first();

  res.json({
    task,
  });
};
