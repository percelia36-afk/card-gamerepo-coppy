"use client";
import { useUser } from "@clerk/nextjs";
import DeletePostButton from "@/components/DeletePostButton";

export default function PostDeleteControlClient({
  postUserId,
  postId,
  onDeleted,
}) {
  const { user } = useUser();
  let canDelete = false;
  // Defensive: ensure postId is not undefined
  const validPostId = postId ?? null;
  if (user && postUserId) {
    if (postUserId === user.id) canDelete = true;
  }
  return (
    <DeletePostButton
      postId={validPostId}
      canDelete={canDelete}
      onDeleted={onDeleted}
    />
  );
}
