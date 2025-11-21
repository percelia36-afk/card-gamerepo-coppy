import { db } from "@/utils/dbConn";

export async function POST(req) {
  try {
    const event = await req.json();
    if (event.type === "user.created") {
      const user = event.data;
      await db.query(
        "INSERT INTO users (clerk_id, gamer_tag, user_profile) VALUES ($1, $2, $3)",
        [
          user.id,
          user.username || user.first_name || "Unknown",
          user.image_url || "",
        ]
      );
    }
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}
