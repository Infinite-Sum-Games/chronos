import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Context, Hono } from "jsr:@hono/hono";

const funcName = "ping";
const app = new Hono().basePath(`/${funcName}`);

// Simple PING endpoint
app.get("/", (c: Context) =>
  c.json({
    message: "Server is alive",
  }, 200));

Deno.serve(app.fetch);
