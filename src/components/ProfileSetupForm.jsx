"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetupForm({ dbUser }) {
  const [gamerTag, setGamerTag] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleProfileSetup(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/profile-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gamer_tag: gamerTag,
          user_profile: userProfile,
          clerk_id: dbUser?.clerk_id,
        }),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      // Redirect to profile page after successful setup
      router.push(`/profile/${dbUser?.clerk_id}`);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleProfileSetup} className="mt-6">
      <input
        type="text"
        placeholder="Gamer Tag"
        className="w-full mb-2 p-2 border rounded"
        value={gamerTag}
        onChange={(e) => setGamerTag(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Profile (bio, etc)"
        className="w-full mb-2 p-2 border rounded"
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
  );
}
