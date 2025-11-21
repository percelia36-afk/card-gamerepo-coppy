//  /scr/app/posts/[id]/page.js

"use client";
import { useState, useEffect } from "react";
import AddComment from "@/components/AddComment";
import ShowComments from "@/components/ShowComments";
import NavBar from "@/components/NavBar";
import PostCommentsClientWrapper from "@/components/PostCommentsClientWrapper";
import PostDeleteControlClient from "@/components/PostDeleteControlClient";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  // Defensive: ensure id is a valid number
  let id = params?.id;
  if (typeof id === "string" && /^\d+$/.test(id)) {
    id = Number(id);
  } else {
    id = NaN;
  }
  const [refreshKey, setRefreshKey] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError("");
      try {
        if (!id || isNaN(id)) throw new Error("Invalid post ID");
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError("Error loading post");
      } finally {
        setLoading(false);
      }
    }
    if (id && !isNaN(id)) fetchPost();
    else setError("Invalid post ID");
  }, [id, refreshKey]);

  // Handler to refresh comments and post after delete
  const handlePostDeleted = () => {
    // Go back to posts list after delete
    router.push("/posts");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <article className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full border border-gray-200 text-center">
        <PostDeleteControlClient
          postUserId={post?.clerk_id || params.clerk_id}
          postId={id && !isNaN(id) ? id : undefined}
          onDeleted={handlePostDeleted}
        />
        {loading ? (
          <div>Loading post...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : !post ? (
          <div className="text-gray-500">Post not found.</div>
        ) : (
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
            <div className="prose prose-lg text-gray-900 whitespace-pre-line text-left mx-auto">
              {post.content || (
                <span className="text-gray-400">No content</span>
              )}
            </div>
          </>
        )}
      </article>
      <section className="w-full max-w-2xl mt-8">
        <PostCommentsClientWrapper
          postId={id && !isNaN(id) ? id : undefined}
          key={refreshKey}
        />
      </section>
    </main>
  );
}
