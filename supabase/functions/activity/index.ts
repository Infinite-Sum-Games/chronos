import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { Context, Hono } from "jsr:@hono/hono";

const funcName = "activity";
const app = new Hono().basePath(`/${funcName}`);

app.get("/", (c: Context) => {
});

app.post("/", (c: Context) => {
});

app.delete("/", (c: Context) => {
});

app.post("/edit", (c: Context) => {
});

Deno.serve(app.fetch);
