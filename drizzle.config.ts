import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./supabase/functions/_shared/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // connectionString: process.env.DATABASE_URL!, // Ensure this is loaded
    url: process.env.DATABASE_URL!,
  },
});
