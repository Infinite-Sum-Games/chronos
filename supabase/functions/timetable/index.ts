import { eq, and } from "npm:drizzle-orm";
import { db } from "../_shared/db.ts";
import { timetable, slots } from "../_shared/schema.ts";
import { z } from "npm:zod";
import { Context, Hono } from "jsr:@hono/hono";

const app = new Hono().basePath("/timetable");

// Validation
const slotSchema = z.object({
  courseId: z.string().regex(/^[a-zA-Z0-9_ ]+$/),
  courseName: z.string().regex(/^[a-zA-Z ]+$/),
  slotNo: z.number().positive(),
  roomNo: z.string().regex(/^[a-zA-Z0-9_ ]+$/),
});


const timetableValidation = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  numberOfDays: z.number().positive(),
  days: z.record(z.string(), z.array(slotSchema)),
});

const editTableValidation = z.object({
  day: z.string().regex(/^[a-zA-Z ]+$/),
  slotNo: z.number().positive(),
  courseId: z.string().regex(/^[a-zA-Z0-9_ ]+$/),
  roomNo: z.string().regex(/^[a-zA-Z0-9_ ]+$/),
})

// Endpoints

app.post("/add", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = timetableValidation.safeParse(body);
    if (!validBody.success) {
      return c.json({ message: "Invalid Input" }, 400);
    }

    const existingTimetable = await db.select().from(timetable).limit(1);
    if (existingTimetable.length > 0) {
      return c.json({ message: "Timetable already exists. Cannot insert." }, 400);
    }

    const existingSlots = await db.select().from(slots).limit(1);
    if (existingSlots.length > 0) {
      return c.json({ message: "Slots already exist. Cannot insert." }, 400);
    }

    const { startDate, numberOfDays, days } = validBody.data;

    const timetableValues: {
      day: string;
      slotNum: number;
      courseId: string;
      roomNo: string;
    }[] = [];

    const slotsValues: {
      date: string;
      day: string;
      slotNum: number;
      courseId: string;
      roomNo: string;
    }[] = [];

    let currentDate = new Date(startDate);
    console.log("Number of days:", numberOfDays);

    // First loop: Populate timetableValues
    for (let i = 0; i < numberOfDays; i++) {
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

      if (days[dayName]) {
        for (const slot of days[dayName]) {
          timetableValues.push({
            day: dayName,
            slotNum: slot.slotNo,
            courseId: slot.courseId,
            roomNo: slot.roomNo,
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Reset currentDate for the second loop
    currentDate = new Date(startDate);

    // Second loop: Populate slotsValues
    for (let i = 0; i < numberOfDays; i++) {
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

      if (days[dayName]) {
        for (const slot of days[dayName]) {
          slotsValues.push({
            date: currentDate.toISOString().split("T")[0], // Format YYYY-MM-DD
            day: dayName,
            slotNum: slot.slotNo,
            courseId: slot.courseId,
            roomNo: slot.roomNo,
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (timetableValues.length === 0 || slotsValues.length === 0) {
      return c.json({ message: "No slots to insert." }, 400);
    }

    // Insert into timetable and slots tables
    await db.transaction(async (tx) => {
      await Promise.all([
        tx.insert(timetable)
          .values(timetableValues)
          .onConflictDoNothing(), // Skip duplicates
        tx.insert(slots).values(slotsValues),
      ]);
    });

    return c.json({ message: "Timetable and Slots inserted successfully." }, 200);

  } catch (error) {
    console.log("Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

app.post("/edit", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = editTableValidation.safeParse(body);
    if (!validBody.success) {
      return c.json({ message: "Invalid Input" }, 400);
    }

    await db.transaction(async (tx) => {
      await tx.update(timetable).set({
        day: validBody.data.day,
        slotNum: validBody.data.slotNo,
        courseId: validBody.data.courseId,
        roomNo: validBody.data.roomNo
      })
        .where(and(eq(timetable.day, validBody.data.day), eq(timetable.slotNum, validBody.data.slotNo)));

      await tx.update(slots).set({
        day: validBody.data.day,
        slotNum: validBody.data.slotNo,
        courseId: validBody.data.courseId,
        roomNo: validBody.data.roomNo
      })
        .where(and(eq(slots.day, validBody.data.day), eq(slots.slotNum, validBody.data.slotNo)));
    })
    return c.json({ message: "The Timetable has been updated" }, 200);

  } catch (error) {
    console.error("Swap Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
})


Deno.serve(app.fetch);
