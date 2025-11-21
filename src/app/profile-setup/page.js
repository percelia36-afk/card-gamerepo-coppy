import ProfileSetupForm from "@/components/ProfileSetupForm";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConn";
import { redirect } from "next/navigation";

export default async function ProfileSetupPage() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  // Check if user already has a gamer_tag
  const { rows } = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    user.id,
  ]);
  const dbUser = rows[0];
  if (dbUser && dbUser.gamer_tag) {
    // Already set up, redirect to profile
    return redirect(`/profile/${dbUser.id}`);
  }
  // Show setup form
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Set up your profile
        </h1>
        <ProfileSetupForm dbUser={dbUser} />
      </div>
    </main>
  );
}
