import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { Context, Hono } from "jsr:@hono/hono";
import { db } from "../_shared/db.ts";
import { timetable, courses } from "../_shared/schema.ts";
import { eq } from "https://esm.sh/drizzle-orm@0.30.10";

const funcName = "daily";
const app = new Hono().basePath(`/${funcName}`);


app.get("/", async (c: Context) => {
  try {
    const curday = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const data = await db.select({
      courseId: timetable.courseId,
      courseName: courses.courseName,
      slot: timetable.slotNum,
      isElective: courses.isElective,
    }).from(timetable).innerJoin(courses, eq(timetable.courseId, courses.courseId)).where(eq(timetable.day, curday));
    return c.json(data);
  } catch (error: unknown) {
    console.log(error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

Deno.serve(app.fetch);
