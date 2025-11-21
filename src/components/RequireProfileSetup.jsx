import { db } from "@/utils/dbConn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RequireProfileSetup({ children }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch user from DB
  let { rows } = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    user.id,
  ]);
  let dbUser = rows[0];
  if (!dbUser) {
    // Insert a blank user row if missing
    await db.query(
      `INSERT INTO users (clerk_id, gamer_tag, user_profile) VALUES ($1, $2, $3)`,
      [user.id, "", ""]
    );
    ({ rows } = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
      user.id,
    ]));
    dbUser = rows[0];
  }

  // If gamer_tag is missing, redirect to profile-setup
  if (!dbUser.gamer_tag) {
    redirect("/profile-setup");
  }

  // Otherwise, render children
  return children({ user, dbUser });
}
