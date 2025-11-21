import Link from "next/link";
import { db } from "@/utils/dbConn";

export default async function HomePage() {
  // Fetch the latest post (by created_at DESC)
  const res = await db.query(
    `SELECT posts.*, users.gamer_tag, users.id as user_id FROM posts LEFT JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC LIMIT 1`
  );
  const latestPost = res.rows[0] || null;
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900 text-center drop-shadow-sm">
        Hello! Welcome to a forum all about card games.
      </h1>
      <p className="mb-8 text-lg text-gray-800 text-center">
        Share your favorite rules, strategies, and stories. Connect with other
        card game enthusiasts!
      </p>
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-200">
          <p className="mb-6 text-base text-gray-600">Most recent post:</p>
          {latestPost ? (
            <div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200 flex flex-col justify-between min-h-[180px]">
              <Link href={`/posts/${latestPost.id}`} className="block mb-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-1 hover:underline">
                  {latestPost.title}
                </h2>
                <p className="text-gray-700 text-sm mb-2">
                  {latestPost.content && latestPost.content.length > 120
                    ? latestPost.content.slice(0, 120) + "..."
                    : latestPost.content}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  Posted at:{" "}
                  {latestPost.created_at
                    ? new Date(latestPost.created_at).toLocaleString()
                    : ""}
                </p>
              </Link>
              <div className="mt-1 text-sm">
                ...By{" "}
                {latestPost.gamer_tag && latestPost.user_id ? (
                  <Link
                    className="text-blue-700 underline hover:text-blue-900 font-medium"
                    href={`/profile/${latestPost.user_id}`}
                  >
                    {latestPost.gamer_tag}
                  </Link>
                ) : (
                  <span className="text-gray-400">Unknown</span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg py-12">
              No posts found. Be the first to create one!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
