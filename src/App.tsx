import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import type { Post } from "./types/post";
import { getPosts } from "./api/postApi";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostEditPage from "./pages/PostEditPage";

import "./App.css";

function App() {
  const serviceName: string = "DevLog";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [token, setToken] = useState<string>(
    localStorage.getItem("accessToken") ?? "",
  );

  const storedUserId = localStorage.getItem("currentUserId");

  const [currentUserId, setCurrentUserId] = useState<number | null>(
    storedUserId ? Number(storedUserId) : null,
  );

  const handleLoginSuccess = (accessToken: string, userId: number) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("currentUserId", String(userId));

    setToken(accessToken);
    setCurrentUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUserId");

    setToken("");
    setCurrentUserId(null);
  };

  const handlePostCreated = (createdPost: Post) => {
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
  };

  const handlePostDeleted = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post,
      ),
    );
  };

  useEffect(() => {
    let ignore = false;

    getPosts()
      .then((data) => {
        if (!ignore) {
          setPosts(data);
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
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>{serviceName}</h1>
          <p>기록 공간</p>

          <nav className="nav">
            <Link to="/">메인</Link>
            <Link to="/auth">회원가입 / 로그인</Link>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  token={token}
                  posts={posts}
                  loading={loading}
                  error={error}
                  onPostCreated={handlePostCreated}
                />
              }
            />

            <Route
              path="/auth"
              element={
                <AuthPage
                  token={token}
                  onLoginSuccess={handleLoginSuccess}
                  onLogout={handleLogout}
                />
              }
            />

            <Route
              path="/posts/:postId"
              element={
                <PostDetailPage
                  token={token}
                  currentUserId={currentUserId}
                  onPostDeleted={handlePostDeleted}
                />
              }
            />

            <Route
              path="/posts/:postId/edit"
              element={
                <PostEditPage token={token} onPostUpdated={handlePostUpdated} />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
