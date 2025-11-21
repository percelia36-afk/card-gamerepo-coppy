import { db } from "@/utils/dbConn";

export async function GET() {
  const res = await db.query(
    `SELECT posts.id, posts.*, users.gamer_tag, users.id as user_id, users.clerk_id
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC`
  );
  return new Response(JSON.stringify(res.rows), { status: 200 });
}
