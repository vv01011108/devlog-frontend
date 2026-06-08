export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  userId: number;
  email: string;
  nickname: string;
};

export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
};
