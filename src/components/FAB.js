import React from "react";

import deleteIcon from "../icons/deleteIcon.png";
import add from "../icons/add.png";

export default function FAB({
  showDeleteIcon,
  isAddNotePage,
  handleFabClick,
  inputText,
  isDragged,
}) {
  return (
    <div
      className="fab-container"
      style={{ bottom: isAddNotePage ? 0 : "20px" }}
    >
      <div
        className={`fab ${showDeleteIcon ? "delete-fab" : ""} 
        ${isAddNotePage ? "fab-expanded" : ""}`}
        style={{
          backgroundColor: isDragged ? "#ff0000d2 " : "blue",
          opacity: isAddNotePage && inputText.length == 0 ? 0.3 : 1,
        }}
        onClick={handleFabClick}
      >
        <img src={isDragged ? deleteIcon : add} width="36px" />
      </div>
    </div>
  );
}
