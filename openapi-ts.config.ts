import "dotenv/config";
import { defineConfig } from "@hey-api/openapi-ts";
import * as process from "node:process";

export default defineConfig({
  input: `${process.env.SERVER}/openapi-docs.json`,
  output: "src/generated",
});
