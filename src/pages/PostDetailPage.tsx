import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Post } from "../types/post";
import { deletePost, getPost } from "../api/postApi";

type PostDetailPageProps = {
  token: string;
  currentUserId: number | null;
  onPostDeleted: (postId: number) => void;
};

function PostDetailPage({
  token,
  currentUserId,
  onPostDeleted,
}: PostDetailPageProps) {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const numericPostId = Number(postId);
  const isInvalidPostId = !postId || Number.isNaN(numericPostId);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  useEffect(() => {
    if (isInvalidPostId) {
      return;
    }

    let ignore = false;

    getPost(numericPostId)
      .then((data) => {
        if (!ignore) {
          setPost(data);
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

  const handleDeletePost = async () => {
    if (!token) {
      setDeleteMessage("글을 삭제하려면 로그인이 필요합니다.");
      return;
    }

    const confirmed = window.confirm("정말 이 글을 삭제하시겠습니까?");

    if (!confirmed) {
      return;
    }

    try {
      await deletePost(token, numericPostId);
      onPostDeleted(numericPostId);
      navigate("/");
    } catch {
      setDeleteMessage("글 삭제 중 오류가 발생했습니다.");
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

  return (
    <section className="card">
      <h2>{post.title}</h2>

      <div className="post-meta detail-meta">
        <span>작성자: {post.authorNickname}</span>
        <span>작성일: {post.createdAt.slice(0, 10)}</span>
      </div>

      <p className="post-detail-content">{post.content}</p>

      <div className="detail-actions">
        <Link to="/">목록으로</Link>

        {isAuthor && (
          <>
            <Link to={`/posts/${post.id}/edit`}>수정하기</Link>

            <button
              type="button"
              className="danger-button"
              onClick={() => {
                void handleDeletePost();
              }}
            >
              삭제하기
            </button>
          </>
        )}
      </div>

      {deleteMessage && <p className="error-message">{deleteMessage}</p>}
    </section>
  );
}

export default PostDetailPage;
