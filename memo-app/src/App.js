import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  let registeredMemo =
    localStorage.getItem("Memos") === null
      ? []
      : JSON.parse(localStorage.getItem("Memos"));

  const [memos, setMemos] = useState(registeredMemo);
  const [status, setStatus] = useState("isDisplaying");
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function handleMemoAdd(text) {
    let nextMemos = [...memos, { id: uuidv4(), content: text }];
    setSelectedId(nextMemos[nextMemos.length - 1].id);
    setText(nextMemos[nextMemos.length - 1].content);
    setMemos(nextMemos);
    nextMemos = JSON.stringify(nextMemos);
    localStorage.setItem("Memos", nextMemos);
  }

  function handleMemoChange(id, text) {
    let nextMemos = memos.map((memo) => {
      if (memo.id === id) {
        return {
          ...memo,
          content: text,
        };
      } else {
        return memo;
      }
    });
    setMemos(nextMemos);
    nextMemos = JSON.stringify(nextMemos);
    localStorage.setItem("Memos", nextMemos);
  }

  function handleDeleteMemo(deleteId) {
    let nextMemos = memos.filter((memo) => memo.id !== deleteId);
    setMemos(nextMemos);
    nextMemos = JSON.stringify(nextMemos);
    localStorage.setItem("Memos", nextMemos);
  }

  function handleTextChange(text) {
    setText(text);
  }

  function handleSelectMemo(id) {
    setSelectedId(id);
  }

  if (localStorage.getItem("Memos") === null || memos.length === 0) {
    return (
      <div className="App">
        <div className="list-container">
          <div className="no-memos">
            <p>メモの登録はありません</p>
          </div>
          <AddButton onStatusChange={setStatus} onMemoAdd={handleMemoAdd} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="list-container">
          <MemoList
            memos={memos}
            onStatusChange={setStatus}
            onSelectMemo={handleSelectMemo}
            onTextChange={handleTextChange}
          />
          <AddButton onStatusChange={setStatus} onMemoAdd={handleMemoAdd} />
        </div>
        {status === "isEditing" && (
          <MemoContent
            key={selectedId}
            onStatusChange={setStatus}
            text={text}
            onTextChange={handleTextChange}
            onMemoChange={handleMemoChange}
            onMemoDelete={handleDeleteMemo}
            selectedId={selectedId}
          />
        )}
      </div>
    );
  }
}

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
          onStatusChange("isDisplaying");
          alert("メモを保存しました。");
        }}
      >
        編集
      </button>
      <button
        onClick={() => {
          onMemoDelete(selectedId);
          onStatusChange("isDisplaying");
          alert("メモを削除しました。");
        }}
      >
        削除
      </button>
    </div>
  );
}

function AddButton({ onStatusChange, onMemoAdd }) {
  return (
    <div className="add-button">
      <button
        onClick={() => {
          onMemoAdd("新規メモ");
          onStatusChange("isEditing");
        }}
      >
        +
      </button>
    </div>
  );
}

export default App;
