import "./App.css";
import { useLoginStatus } from "./LoginContext.js";

function MemoContent({
  onAppStatusChange,
  text,
  selectedId,
  onTextChange,
  onMemoChange,
  onMemoDelete,
}) {
  const { loggedIn } = useLoginStatus();

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
              onAppStatusChange("afterSaving");
            }}
          >
            編集
          </button>
          <button
            onClick={() => {
              onMemoDelete(selectedId);
              onAppStatusChange("afterDeletion");
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
