import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import MemoList from "./MemoList.js";
import MemoContent from "./MemoContent.js";
import AddButton from "./AddButton.js";
import LoginButton from "./LoginButton.js";
import { LoginStatusProvider } from "./LoginContext.js";

function App() {
  const [memos, setMemos] = useState(() => {
    const storedData = localStorage.getItem("Memos");
    return storedData ? JSON.parse(storedData) : [];
  });
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
      }
      return memo;
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
    const memosJson = JSON.stringify(memos);
    localStorage.setItem("Memos", memosJson);
  }, [memos]);

  const noMemos = localStorage.getItem("Memos") === null || memos.length === 0;

  return (
    <div className="App">
      <LoginStatusProvider>
        <div className="list-container">
          <LoginButton onStatusChange={setStatus} />
          {noMemos ? (
            <div className="no-memos">
              <p>メモの登録はありません</p>
            </div>
          ) : (
            <>
              {status === "afterDeletion" && (
                <p className="deletion-message">メモを削除しました</p>
              )}
              {status === "afterSaving" && (
                <p className="saving-message">メモを保存しました</p>
              )}
              <MemoList
                memos={memos}
                onStatusChange={setStatus}
                onMemoSelect={handleMemoSelect}
                onTextChange={handleTextChange}
              />
            </>
          )}
          <AddButton onMemoAdd={handleMemoAdd} onStatusChange={setStatus} />
          {/* )} */}
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
      </LoginStatusProvider>
    </div>
  );
}

export default App;
