import { Request, Response } from "express";
import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export const createSafeRequest = <TInput>(
  schema: z.Schema<TInput>,
  handler: (req: Request, res: Response, data: TInput) => Promise<void>
) => {
  return async (req: Request, res: Response): Promise<void> => {
    const validateResult = schema.safeParse(req.body);

    if (!validateResult.success) {
      res.status(400).json({
        fieldErrors: validateResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      });
      return;
    }

    handler(req, res, validateResult.data);
  };
};
