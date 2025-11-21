"use client";
import { useState } from "react";

export default function ProfileEditForm({ dbUser, user }) {
  const [gamerTag, setGamerTag] = useState(dbUser?.gamer_tag || "");
  const [userProfile, setUserProfile] = useState(dbUser?.user_profile || "");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  // Only allow editing if the logged-in user matches the profile owner
  const canEdit = user && dbUser && user.clerk_id === dbUser.clerk_id;

  async function handleProfileUpdate(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/profile-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gamer_tag: gamerTag,
          user_profile: userProfile,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setMessage("Profile updated!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  }

  return (
    <div>
      <div className="mb-6 p-6 bg-gray-50 rounded-lg flex flex-col items-center shadow-sm">
        {user?.imageUrl && (
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border shadow"
          />
        )}
        <h2 className="text-2xl font-extrabold mb-4 text-gray-900">
          Profile Info
        </h2>
        <div className="w-full max-w-md text-center">
          <p className="text-lg font-semibold text-gray-800 mb-1">
            <span className="block text-gray-500 text-sm font-normal">
              Gamer Tag
            </span>
            {dbUser?.gamer_tag ? (
              <span className="text-xl font-bold text-blue-700">
                {dbUser.gamer_tag}
              </span>
            ) : (
              <em className="text-gray-400">Not set</em>
            )}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="block text-gray-500 text-sm font-normal">
              Profile
            </span>
            {dbUser?.user_profile ? (
              <span className="text-base font-medium text-gray-900 whitespace-pre-line">
                {dbUser.user_profile}
              </span>
            ) : (
              <em className="text-gray-400">Not set</em>
            )}
          </p>
        </div>
        {canEdit && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>
      {canEdit && editing && (
        <form onSubmit={handleProfileUpdate} className="mt-6">
          <input
            type="text"
            placeholder="Gamer Tag"
            className="w-full mb-2 p-3 border rounded text-gray-900 placeholder-gray-700 text-lg font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={gamerTag}
            onChange={(e) => setGamerTag(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profile (bio, etc)"
            className="w-full mb-2 p-3 border rounded text-gray-900 placeholder-gray-700 text-lg font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userProfile}
            onChange={(e) => setUserProfile(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </form>
      )}
    </div>
  );
}
