import type { Post } from "../types/post";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/api/posts`);

  if (!response.ok) {
    throw new Error("게시글 목록을 불러오지 못했습니다.");
  }

  return response.json() as Promise<Post[]>;
}

export async function createPost(
  token: string,
  title: string,
  content: string,
): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("글 작성 실패");
  }

  return response.json() as Promise<Post>;
}
