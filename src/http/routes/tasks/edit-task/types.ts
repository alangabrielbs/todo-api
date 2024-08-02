import { z } from "zod";

import { EditTaskSchema } from "./schema";

export type CreateTaskParams = z.infer<typeof EditTaskSchema>;
