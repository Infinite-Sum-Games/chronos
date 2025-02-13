import { Hono } from "hono";
import { supabase } from "../_shared/client.ts";
import { db } from "../_shared/db.ts";
import { students } from "../_shared/schema.ts";
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
    const validateBody = await signUpSchema.safeParseAsync(c.req.json())

    if (!validateBody.success) {
      return c.json({ message: "Signup failed", error: validateBody.error.format() }, 400);
    }

    const { data, error } = await supabase.auth.signUp({
      email: validateBody.data.email,
      password: validateBody.data.password
    });

    if (error || data?.user?.email) {
      return c.json(
        { message: error?.message || "error while signing up" }, 400);
    }
    const studentData = {
      id: data.user!.id,
      rollNo: validateBody.data.rollNo,
      name: validateBody.data.name,
      isAdmin: false
    };


    const student = await db.insert(students)
      .values(studentData)
      .returning({ id: students.id, name: students.name, rollNo: students.rollNo });
    return c.json(student);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return c.json({ errorMessage }, 400);
  }
});


app.post("/sign-in", async (c) => {
  try {
    const validateBody = signInSchema.safeParse(c.req.json());

    if (!validateBody.success) {
      return c.json({ message: "sign-in failed", error: validateBody.error.format() }, 400);
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email: validateBody.data.email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'https://chronosexample.com/main',
      },
    });

    if (error) {
      return c.json({ message: error.message }, 400);
    }

    return c.json({ message: "Magic link sent to email." }, 200);
  } catch (err) {
    return c.json({ message: "Failure in signing in" }, 400);
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
