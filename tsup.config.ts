import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src",
    "!src/**/*.spec.ts",
    "!src/infra/migrations",
    "!src/tests",
    "!src/infra/*.sqlite",
  ],
  outDir: "build",
});
