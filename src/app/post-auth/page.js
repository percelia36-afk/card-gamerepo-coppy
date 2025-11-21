import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PostAuth() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  // Optionally, insert user into DB here via server logic or API route if needed
  redirect(`/profile/${user.id}`);
  return null;
}
