import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { db } from "../_shared/db.ts";
import { students } from "../_shared/schema.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";

type ValidationSchema = {
  [key: string]: {
    required?: boolean;
    min?: number;
    enum?: string[];
  };
};

//need to move out the client create
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

const validate = (
  body: Record<string, any>,
  schema: ValidationSchema,
): void => {
  for (const key in schema) {
    const rule = schema[key];
    const value = body[key];

    if (rule.required && (value === undefined || value === null)) {
      throw new Error(`${key} is required.`);
    }

    if (rule.min && typeof value === "string" && value.length < rule.min) {
      throw new Error(`${key} must be at least ${rule.min} characters long.`);
    }

    if (rule.enum && !rule.enum.includes(value)) {
      throw new Error(`${key} must be one of: ${rule.enum.join(", ")}.`);
    }
  }
};

serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;
  //remove sign-up maybe
  try {
    if (path === "/sign-up" && req.method === "POST") {
      const body = await req.json();
      validate(body, {
        email: { required: true },
        password: { required: true, min: 8 },
        rollNo: { required: true },
        name: { required: true },
      });

      const { email, password, rollNo, name } = body;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error || !data?.user?.email) {
        return new Response(
          JSON.stringify({
            message: error?.message || "Error while signing up",
          }),
          { status: 400 },
        );
      }

      const studentData = {
        id: data.user.id,
        rollNo,
        name,
        isAdmin: false,
      };

      const student = await db.insert(students).values(studentData).returning();

      return new Response(JSON.stringify(student), { status: 200 });
    }

    if (path === "/sign-in" && req.method === "POST") {
      const body = await req.json();
      validate(body, {
        email: { required: true },
      });

      const { email } = body;
      const { error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 400,
        });
      }

      return new Response(
        JSON.stringify({ message: "Magic link sent to email." }),
        { status: 200 },
      );
    }
    //Middleware needed
    if (path === "/refresh" && req.method === "GET") {
      const cookies = getCookies(req.headers);
      const refresh_token = cookies["refresh_token"];
      if (!refresh_token) {
        return new Response(JSON.stringify({ message: "No refresh token" }), {
          status: 403,
        });
      }

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token,
      });

      if (error) {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 403,
        });
      }

      if (data?.session) {
        const headers = new Headers();
        setCookie(headers, {
          name: "refresh_token",
          value: data.session.refresh_token,
          path: "/",
          secure: true,
          httpOnly: true,
          ...(data.session.expires_at
            ? { expires: new Date(data.session.expires_at * 1000) }
            : {}),
        });

        return new Response(JSON.stringify(data.user), { headers });
      }

      return new Response(JSON.stringify(data.user), { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
});
