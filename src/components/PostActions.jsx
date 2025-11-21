"use client";
import { useState } from "react";

export default function PostActions({ post, onSuccess }) {
  const [showEdit, setShowEdit] = useState(false);
  const [message, setMessage] = useState("");

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id }),
    });
    if (res.ok) {
      setMessage("Post deleted!");
      if (onSuccess) onSuccess();
    } else {
      setMessage("Error: " + (await res.text()));
    }
  }

  return (
    <div className="my-4">
      <button
        className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() => setShowEdit((v) => !v)}
      >
        {showEdit ? "Cancel Edit" : "Edit Post"}
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleDelete}
      >
        Delete Post
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
      {showEdit && (
        <div className="mt-4">
          {/* You can render <PostForm post={post} onSuccess={onSuccess} /> here */}
        </div>
      )}
    </div>
  );
}
