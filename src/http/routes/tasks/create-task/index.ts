import { Request, Response } from "express";
import crypto from "node:crypto";

import { knex } from "@/infra/database";
import { createSafeRequest } from "@/lib/create-safe-request";
import { CreateTaskSchema } from "./schema";
import { CreateTaskParams } from "./types";

const handle = async (req: Request, res: Response, data: CreateTaskParams) => {
  const { title, description, done, duration } = data;

  let sessionId = req.cookies.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    res.cookie("sessionId", sessionId, {
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    });
  }

  await knex("tasks").insert({
    id: crypto.randomUUID(),
    title,
    description,
    done: Boolean(done),
    duration,
    session_id: sessionId,
  });

  res.status(201).send();
};

export const createTask = createSafeRequest(CreateTaskSchema, handle);
