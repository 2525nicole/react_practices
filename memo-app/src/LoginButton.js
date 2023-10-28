import "./App.css";
import { useLoginStatus } from "./LoginContext.js";

function LoginButton({ onAppStatusChange }) {
  const { loggedIn, setLoggedIn } = useLoginStatus();
  return (
    <button
      onClick={() => {
        setLoggedIn(!loggedIn);
        onAppStatusChange("isDisplaying");
      }}
    >
      {loggedIn ? "ログアウト" : "ログイン"}
    </button>
  );
}

export default LoginButton;
