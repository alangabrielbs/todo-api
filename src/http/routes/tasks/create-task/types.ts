import { z } from "zod";

import { CreateTaskSchema } from "./schema";

export type CreateTaskParams = z.infer<typeof CreateTaskSchema>;
