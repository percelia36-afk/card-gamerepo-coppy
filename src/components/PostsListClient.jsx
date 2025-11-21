import NewPostSection from "@/components/NewPostSection";
import Link from "next/link";
import Image from "next/image";
import PostDeleteControlClient from "@/components/PostDeleteControlClient";
("use client");
import { useEffect, useState } from "react";
// ...existing code...
// ...existing code...
// ...existing code...

export default function PostsListClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  async function fetchPosts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts/all");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError("Error loading posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

  // Handler to trigger refresh after new post
  const handlePostAdded = () => setRefreshKey((k) => k + 1);

  return (
    <>
      <div className="mb-8 max-w-3xl mx-auto">
        {/* NewPostSection triggers refresh on success */}
        <NewPostSection onSuccess={handlePostAdded} />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Current Game Posts:
        </h2>
        <p className="text-gray-600 text-base">
          Click on a post to see more details and all posted comments
        </p>
      </div>
      {loading ? (
        <div className="text-center text-gray-500 text-lg py-12">
          Loading posts...
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-12">
          No posts found. Be the first to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200 flex flex-col justify-between min-h-[220px]"
            >
              <Link href={`/posts/${post.id}`} className="block mb-2">
                <h1 className="text-lg font-semibold text-gray-900 mb-1">
                  {post.title}
                </h1>
                <p className="text-gray-700 text-sm mb-2">
                  {post.content && post.content.length > 120
                    ? post.content.slice(0, 120) + "..."
                    : post.content}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  Posted at:{" "}
                  {post.created_at
                    ? new Date(post.created_at).toLocaleString()
                    : ""}
                </p>
                {post.imgurl ? (
                  <Image
                    src={post.imgurl}
                    alt={post.imginfo || "Post image"}
                    className="rounded mt-2"
                  />
                ) : null}
              </Link>
              <div className="mt-1 text-sm">
                ...By{" "}
                <Link
                  className="text-blue-700 underline hover:text-blue-900 font-medium"
                  href={`/profile/${post.user_id}`}
                >
                  {post.gamer_tag}
                </Link>
              </div>
              <PostDeleteControlClient
                postUserId={post.clerk_id}
                postId={post.id ?? null}
                onDeleted={handlePostAdded}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
