import type { Post } from "../types/post";

type PostItemProps = {
  post: Post;
};

function PostItem({ post }: PostItemProps) {
  return (
    <article className="post-item">
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div className="post-meta">
        <span>{post.authorNickname}</span>
        <span>{post.createdAt.slice(0, 10)}</span>
      </div>
    </article>
  );
}

export default PostItem;
