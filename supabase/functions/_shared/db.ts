import postgres from "npm:postgres";
import { drizzle } from "npm:drizzle-orm/postgres-js";

const connectionString = Deno.env.get("SUPABASE_DB_URL");

const client = postgres(connectionString, { prepare: false });
export const db = drizzle({ client });
