import { client, db } from "../functions/_shared/db.ts";
import seedStudents from "./students.ts";
import seedCourses from "./courses.ts";
import seedSlots from "./slots.ts";
import seedActivities from "./activities.ts";
import seedTimetable from "./timetable.ts";


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

