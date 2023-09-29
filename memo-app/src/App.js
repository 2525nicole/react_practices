import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import MemoList from "./MemoList.js";
import MemoContent from "./MemoContent.js";
import AddButton from "./AddButton.js";

function App() {
  const registeredMemo =
    localStorage.getItem("Memos") === null
      ? []
      : JSON.parse(localStorage.getItem("Memos"));

  const [memos, setMemos] = useState(registeredMemo);
  const [status, setStatus] = useState("isDisplaying");
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function handleMemoAdd(text) {
    const nextMemos = [...memos, { id: uuidv4(), content: text }];
    setSelectedId(nextMemos[nextMemos.length - 1].id);
    setText(nextMemos[nextMemos.length - 1].content);
    setMemos(nextMemos);
  }

  function handleMemoChange(id, text) {
    const nextMemos = memos.map((memo) => {
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
  }

  function handleMemoDelete(deleteId) {
    const nextMemos = memos.filter((memo) => memo.id !== deleteId);
    setMemos(nextMemos);
  }

  function handleTextChange(text) {
    setText(text);
  }

  function handleMemoSelect(id) {
    setSelectedId(id);
  }

  useEffect(() => {
    const memosString = JSON.stringify(memos);
    localStorage.setItem("Memos", memosString);
  }, [memos]);

  const noMemos = localStorage.getItem("Memos") === null || memos.length === 0;

  return (
    <div className="App">
      <div className="list-container">
        {noMemos ? (
          <div className="no-memos">
            <p>メモの登録はありません</p>
          </div>
        ) : (
          <MemoList
            memos={memos}
            onStatusChange={setStatus}
            onMemoSelect={handleMemoSelect}
            onTextChange={handleTextChange}
          />
        )}
        <AddButton onMemoAdd={handleMemoAdd} onStatusChange={setStatus} />
      </div>
      {status === "isEditing" && (
        <MemoContent
          key={selectedId}
          onStatusChange={setStatus}
          text={text}
          onTextChange={handleTextChange}
          onMemoChange={handleMemoChange}
          onMemoDelete={handleMemoDelete}
          selectedId={selectedId}
        />
      )}
    </div>
  );
}

export default App;
