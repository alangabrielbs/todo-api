import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";

import { routes } from "./routes/routes";

export const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://todo.alangabriel.dev"],
  })
);
app.use(json());

app.use(cookieParser());

app.use("/api", routes);
