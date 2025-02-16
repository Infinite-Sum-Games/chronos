import seedStudents from "./students.ts";
import seedCourses from "./courses.ts";
import seedSlots from "./slots.ts";
import seedActivities from "./activities.ts";
import seedTimetable from "./timetable.ts";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

const client = postgres(connectionString, { prepare: false });
export const db = drizzle({ client });

async function seed() {
  try {
    console.log("Connected to the database. Seeding data...");

    // Truncating process
    await db.execute("TRUNCATE table students CASCADE");
    await db.execute("TRUNCATE table courses CASCADE");

    // Seeding process
    await seedStudents(db);
    await seedCourses(db);
    await seedSlots(db);
    await seedActivities(db);
    await seedTimetable(db);

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

seed();

