import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Post } from "../types/post";
import { getPost, updatePost } from "../api/postApi";

type PostEditPageProps = {
  token: string;
  currentUserId: number | null;
  onPostUpdated: (post: Post) => void;
};

function PostEditPage({
  token,
  currentUserId,
  onPostUpdated,
}: PostEditPageProps) {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const numericPostId = Number(postId);
  const isInvalidPostId = !postId || Number.isNaN(numericPostId);

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isInvalidPostId) {
      return;
    }

    let ignore = false;

    getPost(numericPostId)
      .then((data) => {
        if (!ignore) {
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
        }
      })
      .catch(() => {
        if (!ignore) {
          setError("게시글을 불러오는 중 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isInvalidPostId, numericPostId]);

  const handleUpdatePost = async () => {
    if (!token) {
      setMessage("로그인이 필요합니다.");
      return;
    }

    try {
      const updatedPost = await updatePost(
        token,
        numericPostId,
        title,
        content,
      );

      onPostUpdated(updatedPost);
      navigate(`/posts/${numericPostId}`);
    } catch {
      setMessage("글 수정 중 오류가 발생했습니다.");
    }
  };

  if (isInvalidPostId) {
    return (
      <section className="card">
        <p className="error-message">잘못된 게시글 ID입니다.</p>
        <Link to="/">목록으로 돌아가기</Link>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="card">
        <h2>글 수정</h2>
        <p>글을 수정하려면 로그인이 필요합니다.</p>
        <Link to="/auth">로그인하러 가기</Link>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="card">
        <p>게시글을 불러오는 중입니다...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card">
        <p className="error-message">{error}</p>
        <Link to="/">목록으로 돌아가기</Link>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="card">
        <p>게시글이 없습니다.</p>
        <Link to="/">목록으로 돌아가기</Link>
      </section>
    );
  }

  const isAuthor = currentUserId !== null && post.authorId === currentUserId;

  if (!isAuthor) {
    return (
      <section className="card">
        <h2>수정 권한 없음</h2>
        <p className="error-message">이 글을 수정할 권한이 없습니다.</p>

        <div className="detail-actions">
          <Link to={`/posts/${post.id}`}>상세로 돌아가기</Link>
          <Link to="/">목록으로</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>글 수정</h2>

      <form
        className="post-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleUpdatePost();
        }}
      >
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        <button type="submit">수정 완료</button>
      </form>

      {message && <p>{message}</p>}

      <div className="detail-actions">
        <Link to={`/posts/${numericPostId}`}>상세로 돌아가기</Link>
        <Link to="/">목록으로</Link>
      </div>
    </section>
  );
}

export default PostEditPage;
