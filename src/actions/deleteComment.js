"use server";
import { db } from "@/utils/dbConn";

export default async function deleteComment(idOfComment) {
  await db.query("DELETE FROM comments WHERE id = $1", [idOfComment]);
}
