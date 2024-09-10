import React, { useEffect, useState } from "react";
import "./App.css";

import Box from "./components/Box.js";
import FAB from "./components/FAB.js";
import AddNote from "./components/AddNote.js";

const App = () => {
  const data = ["Get groceries", "Workout"];

  const [todoList, setTodoList] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const [isAddNotePage, setIsAddNotePage] = useState(false);
  const [inputText, setInputText] = useState("");

  const [dragIndex, setDragIndex] = useState(-1);

  const [moveUpIndex, setMoveUpIndex] = useState(-1);

  const getRandomId = () => {
    return "id-" + Math.random().toString().substring(2, 9) + Date.now();
  };

  useEffect(() => {
    const mappedArr = data.map((item, i) => {
      const id = getRandomId();
      return { id, x: 0, y: 0, title: item, isDone: false };
    });
    setTodoList(mappedArr);
  }, []);

  const checkIfOverlapping = (data, index) => {
    const fab = document.querySelector(".fab");
    const fabRect = fab.getBoundingClientRect();
    const boxRect = {
      top: data.y,
      bottom: data.y + 100,
    };

    const isOverlapping =
      boxRect.top + 10 + 110 * index < fabRect.bottom &&
      boxRect.bottom + 10 + 110 * index > fabRect.top;

    return isOverlapping;
  };

  const handleStop = (e, data, id, index) => {
    setDragIndex(-1);

    const isOverlapping = checkIfOverlapping(data, index);

    setIsDeleteActive(false);

    if (isOverlapping) {
      setMoveUpIndex(index);
      setTimeout(() => {
        setTodoList((prevArr) => prevArr.filter((item) => item.id != id));
        setMoveUpIndex(-1);
      }, 500);
    }
  };

  const handleDrag = (e, data, id, index) => {
    const isOverlapping = checkIfOverlapping(data, index);
    setIsDeleteActive(isOverlapping);

    setDragIndex(index);
  };

  const handleFabClick = () => {
    if (isAddNotePage) {
      if (inputText.length == 0) return;

      const id = getRandomId();
      setTodoList((prevArr) => [
        ...prevArr,
        { id, x: 0, y: 0, title: inputText, isDone: false },
      ]);
      setInputText("");
    }

    setIsAddNotePage(!isAddNotePage);
  };

  const changeIsDone = (value, id) => {
    setTodoList((prevArr) =>
      prevArr.map((item) => {
        if (item.id === id) {
          return { id, x: 0, y: 0, title: item.title, isDone: value };
        }
        return item;
      })
    );
  };

  return (
    <>
      {isAddNotePage ? (
        <AddNote
          setIsAddNotePage={setIsAddNotePage}
          inputText={inputText}
          setInputText={setInputText}
        />
      ) : (
        <div className="container">
          {todoList.map((todoItem, index) => (
            <Box
              key={todoItem.id}
              id={todoItem.id}
              index={index}
              position={{ x: todoItem.x, y: todoItem.y }}
              isDone={todoItem.isDone}
              changeIsDone={changeIsDone}
              title={todoItem.title}
              isDragged={dragIndex === index}
              onStop={handleStop}
              onDrag={handleDrag}
              isDeleteOverlap={isDeleteActive}
              moveUpIndex={moveUpIndex}
            />
          ))}
        </div>
      )}
      <FAB
        isDeleteActive={isDeleteActive}
        isAddNotePage={isAddNotePage}
        inputText={inputText}
        handleFabClick={handleFabClick}
        isDragged={dragIndex >= 0}
      />
    </>
  );
};

export default App;
