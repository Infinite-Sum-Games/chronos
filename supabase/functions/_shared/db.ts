import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

const connectionString = process.env.SUPABASE_DB_URL!;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
