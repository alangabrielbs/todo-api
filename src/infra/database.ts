import "dotenv/config";
import { Knex, knex as setupKnex } from "knex";

import { env } from "../env";

const connection =
  env.DATABASE_CLIENT === "sqlite"
    ? {
        filename: env.DATABASE_URL,
      }
    : env.DATABASE_URL;

export const databaseConfig = {
  client: env.DATABASE_CLIENT,
  connection,
  migrations: {
    directory: "./src/infra/migrations",
    extension: "ts",
  },
  useNullAsDefault: true,
} as Knex.Config;

export const knex = setupKnex(databaseConfig);
