import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { Context, Hono } from "jsr:@hono/hono";
import { db } from "../_shared/db.ts";
import { courses, slots, timetable } from "../_shared/schema.ts";
import { eq } from "npm:drizzle-orm";
import { z } from "npm:zod";

const funcName = "day";
const app = new Hono().basePath(`/${funcName}`);

// Validator
const copyDayValidator = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
});
const clearDayValidator = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// Endpoints
app.get("/", async (c: Context) => {
  try {
    const curDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const data = await db.select({
      courseId: timetable.courseId,
      courseName: courses.courseName,
      slot: timetable.slotNum,
      isElective: courses.isElective,
    }).from(timetable).innerJoin(
      courses,
      eq(timetable.courseId, courses.courseId),
    ).where(eq(timetable.day, curDay));

    return c.json({
      "message": `Time sent for ${curDay}`,
      "courses": data,
    }, 200);
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

app.post("/clear", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = clearDayValidator.safeParse(body);
    if (!validBody.success) {
      return c.json({
        message: "Bad Request",
      }, 400);
    }

    await db.delete(slots).where(eq(slots.date, validBody.data.date));

    return c.json({
      message: "Day has been cleared",
    }, 200);
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

app.post("/copy", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = copyDayValidator.safeParse(body);
    if (!validBody.success) {
      return c.json({
        messge: "Bad Request",
      }, 400);
    }

    await db.transaction(async (tx) => {
      await tx.delete(slots).where(eq(slots.date, validBody.data.date));
      const timetableSlots = await tx
        .select({
          slotNum: timetable.slot_num,
          courseId: timetable.courseId,
          roomNo: timetable.roomNo,
        })
        .from(timetable)
        .where(eq(timetable.day, validBody.data.day));

      if (timetableSlots.length > 0) {
        await tx.insert(slots).values(
          timetableSlots.map((slot) => ({
            date: validBody.data.date,
            slotNum: slot.slotNum,
            courseId: slot.courseId,
            roomNo: slot.roomNo,
          })),
        );
      }
    });

    return c.json({
      message:
        `${validBody.data.day}'s timetable applied on ${validBody.data.date}`,
    }, 200);
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

Deno.serve(app.fetch);
