"use client";
import dynamic from "next/dynamic";
const ProfileEditForm = dynamic(() => import("@/components/ProfileEditForm"));

export default function ProfilePageClient(props) {
  return <ProfileEditForm {...props} />;
}
