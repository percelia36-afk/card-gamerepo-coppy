// /src/app/posts/page.js

"use client";
import PostsListClient from "@/components/PostsListClient";

export default function GamePosts() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-200">
          <PostsListClient />
        </div>
      </div>
    </div>
  );
}
