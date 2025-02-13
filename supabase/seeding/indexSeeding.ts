import { Hono } from "hono";
import { supabase } from "../functions/_shared/client.ts";
import { client, db } from "../functions/_shared/db.ts";


import { drizzle } from "drizzle-orm/node-postgres";
import seedStudents from "./students";
import seedCourses from "./courses";
import seedSlots from "./slots";
import seedActivities from "./activities";
import seedTimetable from "./timetable";


async function seed() {
  try {
    console.log("Connected to the database. Seeding data...");

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

