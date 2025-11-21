"use client";
import { useState } from "react";

export default function DeletePostButton({ postId, canDelete, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  if (!canDelete) return null;
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/delete-post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      if (!res.ok) throw new Error(await res.text());
      if (onDeleted) onDeleted();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mt-2">
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-bold"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Post"}
      </button>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
