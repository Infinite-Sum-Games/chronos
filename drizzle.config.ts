import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./supabase/functions/common/schema.ts",
    out: "./supabase/migrations",
    dialect: "postgresql",
});
