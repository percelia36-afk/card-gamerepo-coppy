import { db } from "@/utils/dbConn";

export async function GET(req, { params }) {
  const id = Number(params.id);
  if (!id) return new Response(JSON.stringify(null), { status: 404 });
  const postRes = await db.query(
    `SELECT posts.id, posts.title, posts.content, users.gamer_tag, users.id as user_id, users.clerk_id
     FROM posts
     LEFT JOIN users ON posts.user_id = users.id
     WHERE posts.id = $1`,
    [id]
  );
  const post = postRes.rows[0] || null;
  return new Response(JSON.stringify(post), { status: post ? 200 : 404 });
}
