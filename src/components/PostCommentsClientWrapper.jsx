"use client";
import PostCommentsSection from "@/components/PostCommentsSection";

export default function PostCommentsClientWrapper({ postId }) {
  return <PostCommentsSection postId={postId} />;
}
