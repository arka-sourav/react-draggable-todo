import React, { useState } from "react";
import Draggable from "react-draggable";

import checkmark from "../icons/checkmark.png";

const Box = ({
  id,
  index,
  position,
  isDone,
  changeIsDone,
  title,
  isDragged,
  onDrag,
  onStop,
  isDeleteOverlap,
  moveUpIndex,
}) => {
  const [coords, setCoords] = useState({ x: position.x, y: position.y });
  const [zIndex, setZIndex] = useState(1);

  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleDrag = (e, data) => {
    setCoords({ x: data.x, y: data.y });
    setZIndex(10);
    setIsStopped(false);

    if (data.x < -30) {
      changeIsDone(true, id);
    }

    if (data.x > 30) {
      changeIsDone(false, id);
    }

    if (onDrag) onDrag(e, data, id, index);
  };

  const handleStop = (e, data) => {
    setCoords({ x: position.x, y: position.y });

    setIsStopped(true);

    setIsStarted(false);

    setZIndex(1);
    if (onStop) onStop(e, data, id, index);
  };

  const handleStart = (e, data) => {
    setIsStarted(true);
  };

  return (
    <Draggable
      position={coords}
      onDrag={handleDrag}
      onStart={handleStart}
      onStop={handleStop}
    >
      <div
        style={{ width: "100%", zIndex: zIndex }}
        className={`${isStopped ? "stopped" : ""}`}
      >
        <div
          className={`box ${isDone ? "done" : ""} 
        ${moveUpIndex >= 0 && index > moveUpIndex ? "move-up" : ""}
        ${isDragged && isDeleteOverlap ? "scale-down" : ""}`}
          style={{
            opacity: isDragged && isDeleteOverlap ? 0.5 : 1,
            cursor: isStarted ? "grabbing" : "grab",
            visibility:
              moveUpIndex >= 0 && index === moveUpIndex ? "hidden" : "visible",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "start" }}>
            {isDone && <img draggable="false" src={checkmark} width="40px" />}
            <div>{title}</div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Box;
