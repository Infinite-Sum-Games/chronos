import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Context, Hono } from "jsr:@hono/hono";
import { CustomError } from "../_shared/error.ts";
import { db } from "../_shared/db.ts";
import { z } from "npm:zod";
import { and, eq, gte } from "npm:drizzle-orm";
import { otps } from "../_shared/schema.ts";

const funcName = "common";
const app = new Hono().basePath(`/${funcName}`);

// Validators
const otpValidator = z.string().length(8).refine(
  (val: string) => {
    const num = Number(val);
    return !isNaN(num) && Number.isInteger(num);
  },
  {
    message: "Must be an 8-digit integer",
  },
);

// Endpoints
app.post("/reset", async (c: Context) => {
  // Send out OTPs to all 4 CRs as this is a destructive action
});

app.post("/reset/confirm", async (c: Context) => {
  const validBody = otpValidator.safeParse(c.req.otp);
  if (!validBody.success) {
    c.json({
      message: "Bad Request",
    }, 400);
    return;
  }

  try {
    await db.transactions(async (tx) => {
      const now = new Date();
      const record = await tx.select().from(otps).where(and(
        eq(otps.otp, validBody.data.otp),
        gte(otps.expiresAt, now),
      ));
      if (!record) {
        throw new CustomError(403, "OTP Invalid");
      }
      await tx.delete(otps).where(eq(otps.id, record[0].id)); // Remove OTP
      await tx.execute(`TRUNCATE TABLE courses CASCADE`); // Clear data
    });

    c.json({
      message:
        "All course, timetables, slots and activities cleared successfully",
    }, 200);
    return;
  } catch (err) {
    if (err instanceof CustomError) {
      c.json({
        message: err.message,
      }, err.statusCode);
      return;
    }
    c.json({
      message: "Internal Server Error! Please try again later.",
    }, 500);
    return;
  }
});

Deno.serve(app.fetch);
