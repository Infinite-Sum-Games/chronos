import { and, eq, or } from "https://esm.sh/drizzle-orm@0.30.10";
import { db } from "../_shared/db.ts";
import { timetable, slots } from "../_shared/schema.ts";
import { z } from "npm:zod";
import { Context, Hono } from "jsr:@hono/hono";

const app = new Hono().basePath("/slot");

// Validation Schema
const swapValidation = z.object({
  remove_on: z.string().regex(/^[a-zA-Z]+$/),
  remove_slot: z.number(),
  add_on: z.string().regex(/^[a-zA-Z]+$/),
  add_slot: z.number(),
});

const addValidation = z.object({
  day: z.string().regex(/^[a-zA-Z]+$/),
  slot: z.number(),
  courseId: z.string().regex(/^[a-zA-Z0-9_ ]+$/),
  roomno: z.string().regex(/^[a-zA-Z0-9_ ]+$/),
});

const deleteValidation = z.object({
  day: z.string().regex(/^[a-zA-Z]+$/),
  slot: z.number(),
});

// Endpoints
app.post("/swap", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = swapValidation.safeParse(body);

    if (!validBody.success) {
      return c.json({ message: "Invalid Input" }, 400);
    }

    const { remove_on, remove_slot, add_on, add_slot } = validBody.data;

    const existingCourses = await db
      .select({
        day: timetable.day,
        slot_num: timetable.slotNum,
        courseId: timetable.courseId,
      })
      .from(timetable)
      .where(
        and(
          or(eq(timetable.day, remove_on), eq(timetable.day, add_on)),
          or(eq(timetable.slotNum, remove_slot), eq(timetable.slotNum, add_slot))
        )
      );

    if (existingCourses.length < 2) {
      return c.json({ message: "Invalid swap. Both slots must exist." }, 400);
    }

    // Extracting courseIds
    const remove_courseId = existingCourses.find(
      (row) => row.day === remove_on && row.slot_num === remove_slot
    )?.courseId;
    const add_courseId = existingCourses.find(
      (row) => row.day === add_on && row.slot_num === add_slot
    )?.courseId;

    if (!remove_courseId || !add_courseId) {
      return c.json({ message: "Could not find course IDs for the given slots." }, 400);
    }

    await db.transaction(async (trx) => {
      // Perform the swap in timetable
      await trx.update(timetable)
        .set({ courseId: add_courseId })
        .where(and(eq(timetable.day, remove_on), eq(timetable.slotNum, remove_slot)));

      await trx.update(timetable)
        .set({ courseId: remove_courseId })
        .where(and(eq(timetable.day, add_on), eq(timetable.slotNum, add_slot)));

      // Perform swap in slots
      await trx.update(slots)
        .set({ courseId: add_courseId })
        .where(and(eq(slots.day, remove_on), eq(slots.slotNum, remove_slot)));

      await trx.update(slots)
        .set({ courseId: remove_courseId })
        .where(and(eq(slots.day, add_on), eq(slots.slotNum, add_slot)));
    });

    return c.json({
      message: `Swapped courses between ${remove_on} slot ${remove_slot} and ${add_on} slot ${add_slot}.`,
      swapped: [
        { day: remove_on, slot: remove_slot, new_courseId: add_courseId },
        { day: add_on, slot: add_slot, new_courseId: remove_courseId },
      ],
    });

  } catch (error) {
    console.error("Swap Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

app.post("/add", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = addValidation.safeParse(body);
    if (!validBody.success) {
      return c.json({ message: "Invalid Input" }, 400);
    }

    await db.transaction(async (trx) => {
      await trx.insert(timetable).values({
        day: validBody.data.day,
        slotNum: validBody.data.slot,
        courseId: validBody.data.courseId,
        roomNo: validBody.data.roomno
      })
        .onConflictDoUpdate({
          target: [timetable.day, timetable.slotNum],
          set: {
            courseId: validBody.data.courseId,
            roomNo: validBody.data.roomno
          }
        })

      const dates = await trx.select({
        date: slots.date,
      }).from(slots).where(eq(slots.day, validBody.data.day));

      for (const date of dates) {
        await trx.insert(slots).values({
          date: date.date,
          day: validBody.data.day,
          slotNum: validBody.data.slot,
          courseId: validBody.data.courseId,
          roomNo: validBody.data.roomno
        })
          .onConflictDoUpdate({
            target: [slots.date, slots.day, slots.slotNum],
            set: {
              courseId: validBody.data.courseId,
              roomNo: validBody.data.roomno
            }

          })
      }
    })
    return c.json({
      "message": `Added slot ${validBody.data.slot} to ${validBody.data.day} for ${validBody.data.courseId}`,
      "day": validBody.data.day,
      "slot": validBody.data.slot,
      "courseId": validBody.data.courseId
    })
  } catch (error) {
    console.log(error)
    return c.json({ message: "Internal Server Error" }, 500)
  }
});

app.delete("/", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = deleteValidation.safeParse(body);
    if (!validBody.success) {
      return c.json({ message: "Invalid Input" }, 400);
    }

    await db.transaction(async (trx) => {
      await trx.delete(timetable).where(
        and(
          eq(timetable.day, validBody.data.day),
          eq(timetable.slotNum, validBody.data.slot)
        )
      );

      await trx.delete(slots).where(
        and(
          eq(slots.day, validBody.data.day),
          eq(slots.slotNum, validBody.data.slot)
        )
      );
    });
    return c.json({
      "message": `Deleted slot ${validBody.data.slot} from ${validBody.data.day}`,
    })

  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

Deno.serve(app.fetch);
