// ProfileServer should only use server-side logic and pass serializable user/dbUser to children.
// Move all DB logic to a server action or API route if needed.
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfileServer({ children, user, dbUser }) {
  // user and dbUser should be fetched in the server page and passed as props
  if (!user) redirect("/sign-in");
  return children({ user, dbUser });
}
