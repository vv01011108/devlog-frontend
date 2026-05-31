export type LoginResponse = {
  accessToken: string;
  tokenType: string;
};

export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
};
