import { db } from "@/utils/dbConn";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
    const { postId } = await req.json();
    // Debug: print user and postId
    // ...existing code...
      postId,
      userId: user.id,
    });
    // Only allow delete if the post belongs to the user with this clerk_id
    const { rows } = await db.query(
      `SELECT posts.id, users.clerk_id FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.id = $1`,
      [postId]
    );
    if (!rows[0]) {
      // ...existing code...
      return new Response("Forbidden", { status: 403 });
    }
    const postOwnerClerkId = rows[0].clerk_id;
    // ...existing code...
    if (postOwnerClerkId !== user.id) {
      // ...existing code...
      return new Response("Forbidden", { status: 403 });
    }
    // First, delete all comments for this post
    await db.query("DELETE FROM comments WHERE post_id = $1", [postId]);
    // Then, delete the post itself
    await db.query("DELETE FROM posts WHERE id = $1", [postId]);
    return new Response("Deleted", { status: 200 });
  } catch (err) {
    // ...existing code...
    return new Response("Error", { status: 500 });
  }
}
