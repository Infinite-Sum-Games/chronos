import { defineConfig } from "drizzle-kit";
import env from "./supabase/env.ts";

export default defineConfig({
  schema: "./supabase/functions/_shared/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
