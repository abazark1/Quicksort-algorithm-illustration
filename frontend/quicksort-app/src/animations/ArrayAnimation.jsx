import React from "react";
import { animated } from "react-spring";
import createAnimation from "./createAnimation";
import HistoryViewer from "./HistoryViewer";
import { formatForArray } from "./formatFunctions";

function ArrayAnimation({ numbers, colors, pointers, springs, api, boxWidth, boxSpacing, currentAction, nextStep, prevStep,
  toggleHistory, showHistory, history}) {
  const totalWidth = numbers.length * boxWidth + (numbers.length - 1) * boxSpacing;
  const isOverlapping = (index1, index2) => index1 === index2;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px" }}>
      <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "4px", backgroundColor: "#f5f5f5" }}>
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Pointers Information
        </div>
        <div>pivot - pointer to the pivot element</div>
        <div>i - pointer to keep the elements less or equal to the pivot</div>
        <div>j - pointer to keep the elements more or equal to the pivot</div>
      </div>
      <p>Steps:</p>
      <div style={{ position: "relative", width: `${totalWidth}px`, display: "flex", justifyContent: "center", marginBottom: "70px", marginTop: "20px"}}>
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
                position: "absolute",
                left: `${idx * (boxWidth + boxSpacing)}px`,
                fontSize: `${boxWidth / 3}px`,
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                backgroundColor: `${colors[idx]}`,
              }}
            >
              {numbers[idx]}
            </animated.div>
          </React.Fragment>
        ))}
        {Object.entries(pointers).map(([key, index]) => {
          if (index === null) return null;

          const isPivot = key === "pivot";
          const pivotIndex = pointers["pivot"];
          const isJ = key === "j";
          let pointerLeft = `${ index * (boxWidth + boxSpacing) + boxWidth / 2}px`;

          if ( isJ && pivotIndex !== undefined && isOverlapping(index, pivotIndex)) {
            pointerLeft = `${index * (boxWidth + boxSpacing) + boxWidth / 2 - boxWidth / 3}px`;
          } else if ( isPivot && pointers["j"] !== undefined && isOverlapping(index, pointers["j"])) {
            pointerLeft = `${index * (boxWidth + boxSpacing) + boxWidth / 2 + boxWidth / 3}px`;
          }

          return (
            <animated.div
              key={key}
              style={{
                position: "absolute",
                top: isJ || isPivot ? "-20px" : `${boxWidth}px`,
                left: pointerLeft,
                width: `${boxWidth / 1.7}px`,
                height: `${boxWidth / 2.5}px`,
                fontSize: `${boxWidth / 4.2}px`,
                backgroundColor: "#72A0C1",
                color: "white",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                borderRadius: "4px",
                transition: "left 300ms, width 300ms, height 300ms, font-size 300ms",
              }}
            >
              {key}
            </animated.div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", fontSize: "16px", color: "darkslategray", marginTop: "20px"}}>
        {currentAction}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevStep} disabled={history.length === 0}>
          Previous
        </button>
        <button onClick={nextStep} disabled={nextStep === null}>
          Next
        </button>
      </div>
      <button onClick={toggleHistory} disabled={history.length === 0}>
        View History
      </button>
      {showHistory && <HistoryViewer history={history} dataStructure="array" />}
    </div>
  );
}

export default createAnimation(ArrayAnimation, formatForArray);
