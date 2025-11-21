import { useUser } from "@clerk/nextjs";
import DeletePostButton from "@/components/DeletePostButton";

export default function PostDeleteControl({ postUserId, postId }) {
  const { user } = useUser();
  // user.id is Clerk id, postUserId is users.id (int) or clerk_id (string)
  // We need to allow delete if user.id matches postUserId (for Clerk id) or if user.id matches the user's clerk_id in the DB
  // For /posts page, postUserId is users.id (int), so we can't match directly. We'll only show delete if postUserId === user.id (string) or postUserId === user.publicMetadata.db_id
  // For /posts/[id], postUserId is users.id (int), so same logic applies.
  // For now, assume postUserId is Clerk id if it's a string, or DB id if it's a number.
  let canDelete = false;
  if (user && postUserId) {
    if (typeof postUserId === "string" && postUserId === user.id)
      canDelete = true;
    if (
      typeof postUserId === "number" &&
      user.publicMetadata?.db_id &&
      postUserId === user.publicMetadata.db_id
    )
      canDelete = true;
  }
  return <DeletePostButton postId={postId} canDelete={canDelete} />;
}
