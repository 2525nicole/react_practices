import "./App.css";

function LoginButton({ loggedIn, onLoggedInChange }) {
  return (
    <div className="login-button">
      <button onClick={onLoggedInChange}>
        {loggedIn ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}

export default LoginButton;
