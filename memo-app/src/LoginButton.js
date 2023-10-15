import { useContext } from "react";
import "./App.css";
import { LoggedInContext } from "./Context.js";

function LoginButton({ onLoggedInChange }) {
  const loggedIn = useContext(LoggedInContext);
  return (
    <button onClick={onLoggedInChange}>
      {loggedIn ? "ログアウト" : "ログイン"}
    </button>
  );
}

export default LoginButton;
