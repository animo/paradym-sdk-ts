import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api.aurora.paradym.id/openapi-docs.json",
  output: "src/generated",
});
