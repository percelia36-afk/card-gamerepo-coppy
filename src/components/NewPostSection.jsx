"use client";
import PostForm from "./PostForm";
import { useState } from "react";

export default function NewPostSection({ onSuccess }) {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold text-lg shadow mb-6"
        onClick={() => setShowForm((v) => !v)}
      >
        {showForm ? "Cancel" : "New Post"}
      </button>
      {showForm && (
        <PostForm
          key={refreshKey}
          onSuccess={() => {
            setShowForm(false);
            setRefreshKey((k) => k + 1);
            if (onSuccess) onSuccess();
          }}
        />
      )}
    </div>
  );
}
