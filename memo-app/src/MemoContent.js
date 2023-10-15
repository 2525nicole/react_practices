import { useContext } from "react";
import "./App.css";
import { LoggedInContext } from "./Context.js";

function MemoContent({
  onStatusChange,
  text,
  selectedId,
  onTextChange,
  onMemoChange,
  onMemoDelete,
}) {
  const loggedIn = useContext(LoggedInContext);
  return (
    <div className="form">
      <textarea
        id="memo"
        value={text}
        disabled={!loggedIn}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <br />
      {loggedIn && (
        <div>
          <button
            onClick={() => {
              onMemoChange(selectedId, text);
              onStatusChange("afterSaving");
            }}
          >
            編集
          </button>
          <button
            onClick={() => {
              onMemoDelete(selectedId);
              onStatusChange("afterDeletion");
            }}
          >
            削除
          </button>
        </div>
      )}
    </div>
  );
}

export default MemoContent;
