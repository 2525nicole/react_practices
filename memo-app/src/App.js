import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import MemoList from "./MemoList.js";
import MemoContent from "./MemoContent.js";
import AddButton from "./AddButton.js";

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

export default App;
