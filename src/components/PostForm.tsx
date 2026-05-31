import { useState } from "react";
import type { Post } from "../types/post";

import { createPost } from "../api/postApi";

type PostFormProps = {
  token: string;
  onPostCreated: (post: Post) => void;
};

function PostForm({ token, onPostCreated }: PostFormProps) {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postMessage, setPostMessage] = useState<string>("");

  const handleCreatePost = async () => {
    if (!token) {
      setPostMessage("로그인이 필요합니다.");
      return;
    }

    try {
      const createdPost = await createPost(token, postTitle, postContent);

      onPostCreated(createdPost);

      setPostTitle("");
      setPostContent("");
      setPostMessage("글이 작성되었습니다.");
    } catch {
      setPostMessage("글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="card">
      <h2>글 작성</h2>

      {token ? (
        <form
          className="post-form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleCreatePost();
          }}
        >
          <input
            type="text"
            placeholder="제목"
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)}
          />

          <textarea
            placeholder="내용"
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
          />

          <button type="submit">작성하기</button>
        </form>
      ) : (
        <p>글을 작성하려면 로그인이 필요합니다.</p>
      )}

      {postMessage && <p>{postMessage}</p>}
    </section>
  );
}

export default PostForm;
