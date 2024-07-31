import "dotenv/config";

import { env } from "@/env";
import cors from "cors";
import express, { json } from "express";

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () =>
  console.log(`Server is running on port ${env.PORT}`)
);
