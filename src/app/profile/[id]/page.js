import ProfilePageClient from "./ProfilePageClient";
import { db } from "@/utils/dbConn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage({ params }) {
  const resolvedParams =
    params && typeof params.then === "function" ? await params : params;
  const { id } = resolvedParams;
  let dbUser = null;
  if (/^user_/.test(id)) {
    // Clerk user id
    const { rows } = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
      id,
    ]);
    dbUser = rows[0] || null;
  } else {
    // Numeric user id
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    dbUser = rows[0] || null;
  }
  const user = await currentUser();
  // If logged-in user is viewing their own profile and gamer_tag is missing, redirect to setup
  if (user && dbUser && user.id === dbUser.clerk_id && !dbUser.gamer_tag) {
    return redirect("/profile-setup");
  }
  // Only pass Clerk user if viewing own profile
  let safeUser = null;
  if (user && dbUser && user.id === dbUser.clerk_id) {
    safeUser = {
      id: user.id,
      clerk_id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
    };
  }
  return <ProfilePageClient dbUser={dbUser} user={safeUser} />;
}
