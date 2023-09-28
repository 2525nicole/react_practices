import "./App.css";

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

export default AddButton;
