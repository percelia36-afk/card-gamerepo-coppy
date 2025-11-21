export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");
  if (!post_id) return new Response(JSON.stringify([]), { status: 200 });
  const cRes = await db.query("SELECT * FROM comments WHERE post_id = $1", [
    post_id,
  ]);
  return new Response(JSON.stringify(cRes.rows), { status: 200 });
}

export async function DELETE(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { id } = await req.json();
    // Optionally, check if user owns the comment before deleting
    await db.query("DELETE FROM comments WHERE id = $1", [id]);
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}
import { db } from "@/utils/dbConn";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { post_id, comment } = await req.json();
    // Get user_id from users table
    const userRes = await db.query("SELECT id FROM users WHERE clerk_id = $1", [
      user.id,
    ]);
    const user_id = userRes.rows[0]?.id;
    if (!user_id) return new Response("User not found", { status: 404 });
    await db.query(
      `INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3)`,
      [post_id, user_id, comment]
    );
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}
