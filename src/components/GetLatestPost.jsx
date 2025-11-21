// src/components/GetLatestPost.jsx
// GetLatestPost should be a server component or receive post data as a prop.
export default function GetLatestPost({ post }) {
  if (!post) return <div>No posts found.</div>;
  return (
    <div className="">
      <h1 className="">
        {post.title} <br />
        ...By {post.gamer_tag}{" "}
      </h1>
      <p className="">{post.content}</p>
      <p>
        Posted at:{" "}
        {post.created_at ? new Date(post.created_at).toLocaleString() : ""}
      </p>
    </div>
  );
}
