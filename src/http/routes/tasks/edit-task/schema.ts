import { z } from "zod";

export const EditTaskSchema = z.object({
  title: z
    .string({
      message: "Titúlo é obrigatório",
      required_error: "Titúlo é obrigatório",
    })
    .min(3, {
      message: "Titúlo deve ter no mínimo 3 caracteres",
    })
    .max(80, {
      message: "Titúlo deve ter no máximo 80 caracteres",
    }),
  description: z
    .string({
      message: "Descrição deve ser uma string",
    })
    .max(300, {
      message: "Descrição deve ter no máximo 300 caracteres",
    }),
  duration: z
    .number({
      message: "Duração deve ser um número",
      required_error: "Duração é obrigatória",
    })
    .int()
    .positive({
      message: "Duração deve ser um número positivo",
    })
    .optional(),
  done: z.boolean(),
});

export const EditTaskParams = z.object({
  id: z
    .string({
      message: "ID é obrigatório",
      required_error: "ID é obrigatório",
    })
    .uuid({
      message: "ID deve ser um UUID",
    }),
});
