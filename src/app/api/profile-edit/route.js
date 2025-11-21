import { db } from "@/utils/dbConn";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { gamer_tag, user_profile } = await req.json();
    await db.query(
      `UPDATE users SET gamer_tag = $1, user_profile = $2 WHERE clerk_id = $3`,
      [gamer_tag, user_profile, user.id]
    );
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}
