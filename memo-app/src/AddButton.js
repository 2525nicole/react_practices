import "./App.css";
import { useLoginStatus } from "./LoginContext.js";

function AddButton({ onMemoAdd, onAppStatusChange }) {
  const { loggedIn } = useLoginStatus();

  return (
    loggedIn && (
      <div className="add-button">
        <button
          onClick={() => {
            onMemoAdd("新規メモ");
            onAppStatusChange("isEditing");
          }}
        >
          +
        </button>
      </div>
    )
  );
}

export default AddButton;
