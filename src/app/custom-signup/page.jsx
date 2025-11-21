"use client";
import { useState } from "react";

export default function CustomSignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    gamer_tag: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/custom-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Sign up failed");
      setSuccess("Sign up successful! You can now sign in.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Custom Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        />
        <input
          name="gamer_tag"
          placeholder="Gamer Tag"
          required
          className="w-full mb-4 p-2 border rounded"
          value={form.gamer_tag}
          onChange={(e) =>
            setForm((f) => ({ ...f, gamer_tag: e.target.value }))
          }
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-full py-2 rounded"
        >
          Sign Up
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>
    </div>
  );
}
