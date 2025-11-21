//  /scr/app/posts/[id]/page.js
// No need for use() in server component
import AddComment from "@/components/AddComment";
import ShowComments from "@/components/ShowComments";
import NavBar from "@/components/NavBar";
import PostCommentsClientWrapper from "@/components/PostCommentsClientWrapper";
import PostDeleteControlClient from "@/components/PostDeleteControlClient";
import { redirect } from "next/navigation";
import { db } from "@/utils/dbConn";

export default async function Page({ params }) {
  // Await params as required by Next.js 16+ App Router
  params = await params;
  let id = params?.id;
  if (typeof id === "string" && /^\d+$/.test(id)) {
    id = Number(id);
  } else {
    id = NaN;
  }

  // Fetch post data directly from the database
  let post = null;
  if (id && !isNaN(id)) {
    try {
      const postRes = await db.query(
        `SELECT posts.id, posts.title, posts.content, users.gamer_tag, users.id as user_id, users.clerk_id
         FROM posts
         LEFT JOIN users ON posts.user_id = users.id
         WHERE posts.id = $1`,
        [id]
      );
      post = postRes.rows[0] || null;
    } catch (e) {
      post = null;
    }
  }

  // Handler to redirect after delete (server-side)
  const handlePostDeleted = () => {
    redirect("/posts");
  };

  // Render post content and comments UI
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <article className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full border border-gray-200 text-center">
        {post ? (
          <>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              {post.title || "Untitled"}
            </h1>
            <div className="font-semibold text-blue-700 text-lg mb-4">
              {post.gamer_tag ? (
                <a
                  href={`/profile/${post.user_id}`}
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  {post.gamer_tag}
                </a>
              ) : (
                "Unknown"
              )}
            </div>
            <div className="prose prose-lg text-gray-900 whitespace-pre-line text-left mx-auto mb-6">
              {post.content || (
                <span className="text-gray-400">No content</span>
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-500">Post not found.</div>
        )}
      </article>
      {id && !isNaN(id) && (
        <section className="w-full max-w-2xl mt-8">
          <PostCommentsClientWrapper postId={id} key={id} />
        </section>
      )}
    </main>
  );
}
