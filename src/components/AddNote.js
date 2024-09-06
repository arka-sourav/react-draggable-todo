import React, { useState } from "react";
import crossIcon from "../icons/crossIcon.png";

export default function AddNote({ setIsAddNotePage, inputText, setInputText }) {
  return (
    <div className="add-note-container">
      <div
        className="add-note-close-btn"
        onClick={() => {
          setInputText("");
          setIsAddNotePage(false);
        }}
      >
        <img src={crossIcon} width="36px" />
      </div>
      <br />
      <input
        className="todo-input"
        autoFocus
        placeholder="Add todo"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
    </div>
  );
}
