import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import type { Post } from "../types/post";

type HomePageProps = {
  token: string;
  posts: Post[];
  loading: boolean;
  error: string;
  onPostCreated: (post: Post) => void;
};

function HomePage({
  token,
  posts,
  loading,
  error,
  onPostCreated,
}: HomePageProps) {
  return (
    <>
      <PostForm token={token} onPostCreated={onPostCreated} />

      <section className="card">
        <h2>공부 기록</h2>

        {loading && <p>게시글을 불러오는 중입니다...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && <PostList posts={posts} />}
      </section>
    </>
  );
}

export default HomePage;
