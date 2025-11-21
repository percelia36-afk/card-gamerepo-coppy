"use client";
import { useState } from "react";
import AddComment from "@/components/AddComment";
import ShowComments from "@/components/ShowComments";

export default function PostCommentsSection({ postId }) {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <ShowComments id={postId} key={refreshKey} />
      </div>
      <AddComment id={postId} onSuccess={() => setRefreshKey((k) => k + 1)} />
    </div>
  );
}
