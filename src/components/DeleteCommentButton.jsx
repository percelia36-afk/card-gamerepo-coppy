"use client";
// /src/components/DeleteCommentButton.jsx

// this must be a client component on top line of file
export default function DeleteCommentButton({
  commentId,
  handleDelete,
  className = "",
}) {
  return (
    <button
      className={`m-2 ${className}`}
      onClick={() => {
        handleDelete(commentId);
      }}
    >
      Delete
    </button>
  );
}
