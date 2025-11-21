"use client";
import { useState } from "react";

export default function AddComment({ id, onSuccess }) {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: id, comment }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      setComment("");
      setMessage("Comment posted!");
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto flex flex-col gap-4"
      >
        <label
          htmlFor="comment"
          className="text-lg font-semibold text-gray-800"
        >
          Add a Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Comment Here..."
          rows={4}
          required
          className="w-full p-3 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow self-end text-lg"
          disabled={loading}
        >
          {loading ? "Posting..." : "Submit"}
        </button>
        {message && (
          <div className="mt-2 text-sm text-center text-green-700">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
