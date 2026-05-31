import { useState } from "react";
import { login } from "../api/authApi";

type LoginFormProps = {
  token: string;
  onLoginSuccess: (accessToken: string) => void;
  onLogout: () => void;
};

function LoginForm({ token, onLoginSuccess, onLogout }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      onLoginSuccess(data.accessToken);
      setLoginMessage("로그인 성공");
      setEmail("");
      setPassword("");
    } catch {
      setLoginMessage("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  if (token) {
    return (
      <section className="card">
        <h2>로그인</h2>
        <p className="success-message">로그인된 상태입니다.</p>
        <button onClick={onLogout}>로그아웃</button>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>로그인</h2>

      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleLogin();
        }}
      >
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">로그인</button>
      </form>

      {loginMessage && <p>{loginMessage}</p>}
    </section>
  );
}

export default LoginForm;
