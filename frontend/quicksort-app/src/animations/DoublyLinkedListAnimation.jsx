import React from "react";
import { animated } from "react-spring";
import createAnimation from "./createAnimation";
import HistoryViewer from "./HistoryViewer";
import { formatForDoublyLinkedList } from "./formatFunctions";

function DoublyLinkedLisAnimation({ numbers, colors, pointers, springs, api, boxWidth, boxSpacing, currentAction, nextStep, prevStep, toggleHistory, showHistory, history}) {
  const totalWidth = numbers.length * boxWidth + (numbers.length - 1) * boxSpacing;
  const arrowWidth = 20;
  const isOverlapping = (index1, index2) => index1 === index2;

  const renderArrow = (idx) => {
    if (idx === 0) {
      return "→";
    } else if (idx === numbers.length - 2) {
      return "←";
    } else if (idx > 0 && idx < numbers.length - 1) {
      return "--";
    }
    return null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px"}}>
      <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "4px", backgroundColor: "#f5f5f5" }}>
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Pointers Information
        </div>
        <div>pivot - pointer to the pivot element</div>
        <div>s - pointer to find the elements less than the pivot</div>
        <div>q - pointer to be unlinked and inserted before pivot</div>
      </div>
      <p>Steps:</p>
      <div style={{ position: "relative", width: `${totalWidth}px`, display: "flex", justifyContent: "center", marginBottom: "70px" }}>
        {springs.map((props, idx) => (
          <React.Fragment key={idx}>
            <animated.div
              style={{
                ...props,
                width: `${boxWidth}px`,
                height: `${boxWidth}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: idx === 0 || idx === numbers.length - 1 ? "none" : "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: idx === 0 || idx === numbers.length - 1 ? "none" : "1px 1px 3px rgba(0,0,0,0.4)",
                position: "absolute",
                left: `${idx * (boxWidth + boxSpacing)}px`,
                fontSize: idx === 0 || idx === numbers.length - 1 ? `${boxWidth}px` : `${boxWidth / 3}px`,
                backgroundColor: idx === 0 || idx == 1 || idx === numbers.length - 1 || idx === numbers.length - 2 ? "white" : `${colors[idx]}`,
              }}> {numbers[idx]}
            </animated.div>
            {idx < numbers.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: `${ idx * (boxWidth + boxSpacing) + boxWidth + boxSpacing / 2 - 6}px`,
                  top: `${boxWidth / 4}px`,
                  fontSize: `${boxWidth / 3}px`,
                  textAlign: "center",}}>
                {renderArrow(idx)}
              </div>
            )}
          </React.Fragment>
        ))}
        {Object.entries(pointers).map(([key, index]) => {
          if (index === null) return null;

          const isS = key === "s";
          const SIndex = pointers["s"];
          const isQ = key === "q";
          let pointerLeft = `${index * (boxWidth + boxSpacing) + boxWidth / 2}px`;

          if (isQ && SIndex !== undefined && isOverlapping(index, SIndex)) {
            pointerLeft = `${index * (boxWidth + boxSpacing) + boxWidth / 2 - boxWidth / 3}px`;
          } else if (isS && pointers["q"] !== undefined && isOverlapping(index, pointers["q"])) {
            pointerLeft = `${index * (boxWidth + boxSpacing) + boxWidth / 2 + boxWidth / 3}px`;
          }

          return (
            <animated.div
              key={key}
              style={{
                position: "absolute",
                width: `${boxWidth / 1.7}px`,
                height: `${boxWidth / 2.5}px`,
                fontSize: `${boxWidth / 4}px`,
                transform: "translateX(-50%)",
                backgroundColor: "#72A0C1",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                top: "-20px",
                left: pointerLeft,
                boxShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                borderRadius: "4px",
                transition: "left 300ms",
              }}> {key}
            </animated.div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", fontSize: "16px", color: "darkslategray", marginTop: "40px" }}>
        {currentAction}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevStep} disabled={history.length === 0}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </div>
      <button onClick={toggleHistory} disabled={history.length === 0}> View History </button>
      {showHistory && (<HistoryViewer history={history} dataStructure="doublyLinkedList" />)}
    </div>
  );
}

export default createAnimation(DoublyLinkedLisAnimation, formatForDoublyLinkedList);
