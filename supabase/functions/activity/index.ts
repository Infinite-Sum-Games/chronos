import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Context, Hono } from "jsr:@hono/hono";
import { db } from "../_shared/db.ts";
import { activity } from "../_shared/schema.ts";
import { z } from "npm:zod";
import { eq } from "drizzle-orm";

const funcName = "activity";
const app = new Hono().basePath(`/${funcName}`);

// Validators
const activityValidator = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  activityType: z.enum([
    "QUIZ",
    "EXAM",
    "TUTORIAL",
    "EVALUATION",
    "ASSIGNMENT",
    "OTHERS",
  ]),
  course_id: z.string(),
  description: z.string().nullable(),
});

// Endpoints
app.get("/", async (c: Context) => {
  try {
    const result = await db.select({
      courseId: activity.courseId,
      date: activity.date,
      time: activity.time,
      description: activity.description,
      type: activity.actitvityType,
    }).from(activity);
    return c.json({
      message: "Activities returned successfully",
      activity: result,
    }, 200);
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

/* Admins ONLY */
// -- addActivity
app.post("/", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = activityValidator.safeParse(body);
    if (!validBody.success) {
      return c.json({
        message: "Bad Request",
      }, 400);
    }
    const result = await db.insert(activity).values({
      date: validBody.data.date,
      time: validBody.data.time,
      activityType: validBody.data.activityType,
      courseId: validBody.data.courseId,
      description: validBody.data.description,
    }).returning();

    return c.json({
      message: "Activity successfully added",
      activityId: result.id,
      date: result.date,
      time: result.time,
      courseId: result.courseId,
      description: result.description,
    });
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

/* Admins ONLY */
// -- deleteActivity
app.delete("/:id", async (c: Context) => {
  const validParam = z.string().uuid().safeParse(c.req.param("id"));
  if (!validParam.success) {
    return c.json({
      message: "Bad Request",
    }, 400);
  }

  try {
    await db.delete(activity).where(eq(activity.id, validParam.data.id));

    return c.json({
      message: "Activity deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

/* Admins ONLY */
// -- editActivity
app.post("/edit/:id", async (c: Context) => {
  try {
    const body = await c.req.json();
    const validBody = activityValidator.safeParse(body);
    const validParam = z.string().uuid().safeParse(c.req.param("id"));

    if (!validParam.success || !validBody.success) {
      return c.json({
        message: "Bad Request",
      }, 400);
    }

    const result = await db.update(activity)
      .set({
        date: validBody.data.date,
        time: validBody.data.time,
        activityType: validBody.data.activityType,
        courseId: validBody.data.courseId,
        description: validBody.data.description,
      })
      .where(eq(activity.id, validParam.data.id))
      .returning();

    if (!result) {
      return c.json({
        message: "Activity update failed",
      }, 404);
    }

    return c.json({
      message: "Activity successfully edited",
      activityId: result.id,
      date: result.date,
      time: result.time,
      courseId: result.courseId,
      description: result.description,
    });
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Internal Server Error",
    }, 500);
  }
});

Deno.serve(app.fetch);
