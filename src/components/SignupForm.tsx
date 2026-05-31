import { useState } from "react";
import { signup } from "../api/authApi";

function SignupForm() {
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupNickname, setSignupNickname] = useState<string>("");
  const [signupMessage, setSignupMessage] = useState<string>("");

  const handleSignup = async () => {
    try {
      const data = await signup(signupEmail, signupPassword, signupNickname);

      setSignupMessage(`${data.nickname}님, 회원가입이 완료되었습니다.`);
      setSignupEmail("");
      setSignupPassword("");
      setSignupNickname("");
    } catch {
      setSignupMessage("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="card">
      <h2>회원가입</h2>

      <form
        className="signup-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSignup();
        }}
      >
        <input
          type="email"
          placeholder="이메일"
          value={signupEmail}
          onChange={(event) => setSignupEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={signupPassword}
          onChange={(event) => setSignupPassword(event.target.value)}
        />

        <input
          type="text"
          placeholder="닉네임"
          value={signupNickname}
          onChange={(event) => setSignupNickname(event.target.value)}
        />

        <button type="submit">회원가입</button>
      </form>

      {signupMessage && <p>{signupMessage}</p>}
    </section>
  );
}

export default SignupForm;
