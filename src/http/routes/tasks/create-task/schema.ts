import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string({
      message: "Titúlo é obrigatório",
      required_error: "Titúlo é obrigatório",
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
    })
    .optional(),
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
  done: z.boolean().default(false).optional(),
});
