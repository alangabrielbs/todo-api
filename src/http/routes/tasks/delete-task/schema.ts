import { z } from "zod";

export const GetTaskParams = z.object({
  id: z
    .string({
      message: "ID é obrigatório",
      required_error: "ID é obrigatório",
    })
    .uuid({
      message: "ID deve ser um UUID",
    }),
});
