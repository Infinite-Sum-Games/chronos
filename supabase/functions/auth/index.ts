import { Hono } from "hono";
import { supabase } from "../_shared/client";
// import { db } from "../_shared/db";
// import { students } from "../_shared/schema";
// import { z } from "zod";

const app = new Hono();

app.get("/auth/google", async (c) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https:/auth-callback-thingy",
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  });

  if (error) {
    return c.json({ message: error.message }, 400);
  }
  return c.redirect(data.url)
})
