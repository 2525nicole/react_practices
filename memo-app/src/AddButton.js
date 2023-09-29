import "./App.css";

function AddButton({ onMemoAdd, onStatusChange }) {
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

export default AddButton;
