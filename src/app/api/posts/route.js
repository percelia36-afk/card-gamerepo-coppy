import { db } from "@/utils/dbConn";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { title, content, imgurl, imginfo } = await req.json();
    // Get user_id from users table
    const userRes = await db.query("SELECT id FROM users WHERE clerk_id = $1", [
      user.id,
    ]);
    const user_id = userRes.rows[0]?.id;
    if (!user_id) return new Response("User not found", { status: 404 });
    await db.query(
      `INSERT INTO posts (user_id, title, content, created_at, imgurl, imginfo) VALUES ($1, $2, $3, NOW(), $4, $5)`,
      [user_id, title, content, imgurl, imginfo]
    );
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { id, title, content, imgurl, imginfo } = await req.json();
    // Get user_id from users table
    const userRes = await db.query("SELECT id FROM users WHERE clerk_id = $1", [
      user.id,
    ]);
    const user_id = userRes.rows[0]?.id;
    if (!user_id) return new Response("User not found", { status: 404 });
    // Only allow editing own posts
    const postRes = await db.query("SELECT user_id FROM posts WHERE id = $1", [
      id,
    ]);
    if (postRes.rows[0]?.user_id !== user_id)
      return new Response("Forbidden", { status: 403 });
    await db.query(
      `UPDATE posts SET title = $1, content = $2, imgurl = $3, imginfo = $4 WHERE id = $5`,
      [title, content, imgurl, imginfo, id]
    );
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { id } = await req.json();
    // Get user_id from users table
    const userRes = await db.query("SELECT id FROM users WHERE clerk_id = $1", [
      user.id,
    ]);
    const user_id = userRes.rows[0]?.id;
    if (!user_id) return new Response("User not found", { status: 404 });
    // Only allow deleting own posts
    const postRes = await db.query("SELECT user_id FROM posts WHERE id = $1", [
      id,
    ]);
    if (postRes.rows[0]?.user_id !== user_id)
      return new Response("Forbidden", { status: 403 });
    await db.query("DELETE FROM posts WHERE id = $1", [id]);
    return new Response("ok", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("error", { status: 500 });
  }
}
