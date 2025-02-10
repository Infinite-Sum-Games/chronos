import { Hono } from "Hono";
import { supabase } from "../_shared/client.ts";
import { db } from "../_shared/db.ts";
import { students } from "../_shared/schema.ts";
import { getCookie, setCookie } from "Hono/cookie";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

const app = new Hono();

const signUpSchema = z.object(
  {
    email: z.string().email(),
    password: z.string().min(8),
    rollNo: z.string(),
    name: z.string()
  }
)

const signInSchema = z.object(
  {
    email: z.string().email()
  }
)

app.post("/sign-up", async (c) => {
  try {
    const body = await c.req.json();
    const validateData = signUpSchema.parse(body)

    const { email, password, rollNo, name } = validateData;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || data?.user?.email) {
      return c.json(
        { message: error?.message || "error while signing up" }, 400);
    }
    const studentData = {
      id: data.user?.id,
      rollNo: validateData.rollNo,
      name: validateData.name,
      isAdmin: false,
    };

    const student = await db.insert(students).values(studentData).returning();
    return c.json(student);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return c.json({ errorMessage }, 400);
  }
});

app.post("/sign-in", async (c) => {
  try {
    const body = await c.req.json();
    const validateData = signInSchema.parse(body);

    const { email } = validateData;
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      return c.json({ message: error.message }, 400);
    }

    return c.json({ message: "Magic link sent to email." }, 200);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: errorMessage }, 400);
  }
});

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



app.get("/refresh", async (c) => {
  const refresh_token = getCookie(c, "refresh_token");
  if (!refresh_token) {
    throw new HTTPException(403, { message: "No refresh token" });
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) {
    console.error("Error while refreshing token", error);
    throw new HTTPException(403, { message: error.message });
  }

  if (data?.session) {
    setCookie(c, "refresh_token", data.session.refresh_token, {
      ...(data.session.expires_at &&
        { expires: new Date(data.session.expires_at) }),
      httpOnly: true,
      path: "/",
      secure: true,
    });
  }

  return c.json(data.user);
});
