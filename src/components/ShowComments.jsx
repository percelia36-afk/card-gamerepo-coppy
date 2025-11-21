"use client";
import { useEffect, useState } from "react";
import DeleteCommentButton from "@/components/DeleteCommentButton";

export default function ShowComments({ id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchComments() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/comments?post_id=${id}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError("Error loading comments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [id]);

  async function handleDelete(idOfComment) {
    try {
      const res = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: idOfComment }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      fetchComments();
    } catch (err) {
      setError("Error deleting comment");
    }
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-gray-900">Comments</h2>
      <div className="space-y-6">
        {loading ? (
          <div>Loading comments...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-500">No comments yet.</div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 border rounded p-4 shadow-sm"
            >
              <p className="text-gray-900 text-base whitespace-pre-line mb-2">
                {comment.comment}
              </p>
              <DeleteCommentButton
                commentId={comment.id}
                handleDelete={handleDelete}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow text-sm font-semibold transition-colors duration-150"
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
