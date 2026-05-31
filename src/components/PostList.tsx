import type { Post } from "../types/post";
import PostItem from "./PostItem";

type PostListProps = {
  posts: Post[];
};

function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p>아직 작성된 기록이 없습니다.</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
