import "dotenv/config";
import { Knex, knex as setupKnex } from "knex";

import { env } from "../env";

export const databaseConfig = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    directory: "./src/infra/migrations",
    extension: "ts",
  },
  useNullAsDefault: true,
} as Knex.Config;

export const knex = setupKnex(databaseConfig);
