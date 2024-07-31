import "dotenv/config";

import { env } from "@/env";
import cors from "cors";
import express, { json } from "express";
import { routes } from "./routes/routes";

const app = express();

app.use(cors());
app.use(json());

app.use("/api", routes);

app.listen(env.PORT, () =>
  console.log(`Server is running on port ${env.PORT}`)
);
