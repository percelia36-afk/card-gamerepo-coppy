"use client";
import { useState } from "react";

export default function PostForm({ post, onSuccess }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imgurl, setImgurl] = useState(post?.imgurl || "");
  const [imginfo, setImginfo] = useState(post?.imginfo || "");
  const [message, setMessage] = useState("");
  const isEdit = !!post;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit
      ? { id: post.id, title, content, imgurl, imginfo }
      : { title, content, imgurl, imginfo };
    const res = await fetch("/api/posts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMessage(isEdit ? "Post updated!" : "Post created!");
      if (onSuccess) onSuccess();
    } else {
      setMessage("Error: " + (await res.text()));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 bg-gray-50 rounded shadow-md max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-extrabold mb-4 text-gray-900">
        {isEdit ? "Edit Post" : "New Post"}
      </h2>
      <label
        className="block mb-2 text-lg font-semibold text-gray-800"
        htmlFor="title"
      >
        Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Enter a descriptive title..."
        className="w-full mb-4 p-3 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label
        className="block mb-2 text-lg font-semibold text-gray-800"
        htmlFor="content"
      >
        Content
      </label>
      <textarea
        id="content"
        placeholder="Write your post content here..."
        className="w-full mb-4 p-3 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={5}
      />
      <label
        className="block mb-2 text-lg font-semibold text-gray-800"
        htmlFor="imgurl"
      >
        Image URL
      </label>
      <input
        id="imgurl"
        type="text"
        placeholder="Paste an image URL (optional)"
        className="w-full mb-4 p-3 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700"
        value={imgurl}
        onChange={(e) => setImgurl(e.target.value)}
      />
      <label
        className="block mb-2 text-lg font-semibold text-gray-800"
        htmlFor="imginfo"
      >
        Image Alt/Info
      </label>
      <input
        id="imginfo"
        type="text"
        placeholder="Describe the image (for accessibility)"
        className="w-full mb-6 p-3 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700"
        value={imginfo}
        onChange={(e) => setImginfo(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold text-lg shadow"
      >
        {isEdit ? "Update" : "Create"}
      </button>
      {message && (
        <p className="mt-4 text-base font-medium text-green-700">{message}</p>
      )}
    </form>
  );
}
