import "./App.css";

function MemoContent({
  onStatusChange,
  text,
  selectedId,
  onTextChange,
  onMemoChange,
  onMemoDelete,
}) {
  return (
    <div className="form">
      <textarea
        id="memo"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <br />
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
  );
}

export default MemoContent;
