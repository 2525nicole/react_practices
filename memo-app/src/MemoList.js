import "./App.css";

function MemoList({ memos, onSelectMemo, onTextChange, onStatusChange }) {
  return (
    <ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          onClick={(e) => {
            onSelectMemo(memo.id);
            onTextChange(memo.content);
            onStatusChange("isEditing");
          }}
        >
          {memo.content.substring(0, memo.content.indexOf("\n")) ||
            memo.content}
        </li>
      ))}
    </ul>
  );
}

export default MemoList;
