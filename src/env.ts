import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}

const envSchema = z.object({
  DATABASE_CLIENT: z.enum(["sqlite", "pg"]).default("sqlite"),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("⚠️ Invalid environment variables");
  console.error(JSON.stringify(_env.error.format(), null, 2));

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
