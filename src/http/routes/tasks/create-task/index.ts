import { Request, Response } from "express";
import crypto from "node:crypto";

import { knex } from "@/infra/database";
import { createSafeRequest } from "@/lib/create-safe-request";
import { CreateTaskSchema } from "./schema";
import { CreateTaskParams } from "./types";

const handle = async (req: Request, res: Response, data: CreateTaskParams) => {
  const { title, description, done, duration } = data;

  await knex("tasks").insert({
    id: crypto.randomUUID(),
    title,
    description,
    done: Boolean(done),
    duration,
  });

  res.status(201).send();
};

export const createTask = createSafeRequest(CreateTaskSchema, handle);
