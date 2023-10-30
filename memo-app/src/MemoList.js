import React, { useCallback, memo } from "react";
import "./App.css";

const MemoList = memo(
  ({ memos, onMemoSelect, onTextChange, onAppStatusChange }) => {
    const handleMemoClick = useCallback(
      (memo) => {
        onMemoSelect(memo.id);
        onTextChange(memo.content);
        onAppStatusChange("isEditing");
      },
      [onMemoSelect, onTextChange, onAppStatusChange],
    );

    return (
      <ul>
        {memos.map((memo) => (
          <li key={memo.id} onClick={() => handleMemoClick(memo)}>
            {memo.content.substring(0, memo.content.indexOf("\n")) ||
              memo.content}
          </li>
        ))}
      </ul>
    );
  },
);

export default MemoList;
