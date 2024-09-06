import React, { useEffect, useState } from "react";
import "./App.css";

import Box from "./components/Box.js";
import FAB from "./components/FAB.js";
import AddNote from "./components/AddNote.js";

const App = () => {
  const data = ["Get groceries", "Workout"];

  const [positions, setPositions] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

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
      return { id, x: 0, y: 0, title: item };
    });
    setPositions(mappedArr);
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
    setShowDeleteIcon(isOverlapping);
    setShowDeleteIcon(false);

    if (isOverlapping) {
      setMoveUpIndex(index);
      setTimeout(() => {
        setPositions((prevArr) => prevArr.filter((item) => item.id != id));
        setMoveUpIndex(-1);
      }, 500);
    }
  };

  const handleDrag = (e, data, id, index) => {
    const isOverlapping = checkIfOverlapping(data, index);
    setShowDeleteIcon(isOverlapping);

    setDragIndex(index);
  };

  const handleFabClick = () => {
    if (isAddNotePage) {
      if (inputText.length == 0) return;

      const id = getRandomId();
      setPositions((prevArr) => [
        ...prevArr,
        { id, x: 0, y: 0, title: inputText },
      ]);
      setInputText("");
    }

    setIsAddNotePage(!isAddNotePage);
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
          {positions.map((pos, index) => (
            <Box
              key={pos.id}
              id={pos.id}
              index={index}
              position={{ x: pos.x, y: pos.y }}
              title={pos.title}
              isDragged={dragIndex === index}
              onStop={handleStop}
              onDrag={handleDrag}
              isDeleteOverlap={showDeleteIcon}
              moveUpIndex={moveUpIndex}
            />
          ))}
        </div>
      )}
      <FAB
        showDeleteIcon={showDeleteIcon}
        isAddNotePage={isAddNotePage}
        inputText={inputText}
        handleFabClick={handleFabClick}
        isDragged={dragIndex >= 0}
      />
    </>
  );
};

export default App;
