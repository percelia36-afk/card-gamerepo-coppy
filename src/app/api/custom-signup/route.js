import { db } from "@/utils/dbConn";

export async function POST(req) {
  try {
    const { email, password, gamer_tag } = await req.json();

    // 1. Create user in Clerk via API
    const res = await fetch("https://api.clerk.com/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email_address: [email],
        password,
      }),
    });
    if (!res.ok) throw new Error("Clerk user creation failed");
    const clerkUser = await res.json();

    // 2. Insert user into your DB
    await db.query("INSERT INTO users (clerk_id, gamer_tag) VALUES ($1, $2)", [
      clerkUser.id,
      gamer_tag,
    ]);

    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}
