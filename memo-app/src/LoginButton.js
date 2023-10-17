import "./App.css";
import { useLoginStatus } from "./LoginContext.js";

function LoginButton({ onStatusChange }) {
  const { loggedIn, setLoggedIn } = useLoginStatus();
  return (
    <button
      onClick={() => {
        setLoggedIn(!loggedIn);
        onStatusChange("isDisplaying");
      }}
    >
      {loggedIn ? "ログアウト" : "ログイン"}
    </button>
  );
}

export default LoginButton;
