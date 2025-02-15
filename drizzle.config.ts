import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./supabase/functions/_shared/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
});
