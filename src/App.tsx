import { useEffect, useState } from "react";

import type { Post } from "./types/post";
import { getPosts } from "./api/postApi";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import "./App.css";

function App() {
  const serviceName: string = "DevLog";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [token, setToken] = useState<string>(
    localStorage.getItem("accessToken") ?? "",
  );

  const handleLoginSuccess = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken("");
  };

  const handlePostCreated = (createdPost: Post) => {
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
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
    <div className="app">
      <header className="header">
        <h1>{serviceName}</h1>
        <p>나의 개발 기록 공간</p>
      </header>

      <main className="main">
        <SignupForm />

        <LoginForm
          token={token}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />

        <PostForm token={token} onPostCreated={handlePostCreated} />

        <section className="card">
          <h2>공부 기록</h2>

          {loading && <p>게시글을 불러오는 중입니다...</p>}

          {error && <p className="error-message">{error}</p>}

          {!loading && !error && <PostList posts={posts} />}
        </section>
      </main>
    </div>
  );
}

export default App;
