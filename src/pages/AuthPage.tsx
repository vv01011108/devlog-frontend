import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

type AuthPageProps = {
  token: string;
  onLoginSuccess: (accessToken: string, userId: number) => void;
  onLogout: () => void;
};

function AuthPage({ token, onLoginSuccess, onLogout }: AuthPageProps) {
  return (
    <>
      <SignupForm />

      <LoginForm
        token={token}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
      />
    </>
  );
}

export default AuthPage;
