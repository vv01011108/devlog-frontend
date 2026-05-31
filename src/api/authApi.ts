import type { LoginResponse, UserResponse } from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  return response.json() as Promise<LoginResponse>;
}

export async function signup(
  email: string,
  password: string,
  nickname: string,
): Promise<UserResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      nickname,
    }),
  });

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }

  return response.json() as Promise<UserResponse>;
}
