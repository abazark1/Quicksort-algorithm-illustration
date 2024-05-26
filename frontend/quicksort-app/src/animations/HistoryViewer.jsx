const HistoryViewer = ({ history, dataStructure }) => {
  const boxWidth = 50;

  function isOverlapping(index1, index2) {
    return index1 === index2;
  }

  function getStyleBasedOnDataStructure(
    dataStructure, key, pointerIdx, pointers) {
    let left = "50%";
    const isS = key === "s";
    const SIndex = pointers["s"];
    const isQ = key === "q";

    if (isQ && SIndex !== undefined && isOverlapping(pointerIdx, SIndex)) {
      left = `${boxWidth / 2 - boxWidth / 3}px`;
    } else if (isS && pointers["q"] !== undefined && isOverlapping(pointerIdx, pointers["q"])) {
      left = `${boxWidth / 2 + boxWidth / 3}px`;
    }

    switch (dataStructure) {
      case "array":
        const isPivot = key === "pivot";
        const isJ = key === "j";
        const pivotIndex = pointers["pivot"];
        const jIndex = pointers["j"];
        let top = isJ || isPivot ? "-20px" : "45px";

        if (isJ && pivotIndex !== undefined && isOverlapping(pointerIdx, pivotIndex)) {
          left = `${boxWidth / 2 - boxWidth / 3}px`;
        } else if (isPivot && jIndex !== undefined && isOverlapping(pointerIdx, jIndex)) {
          left = `${boxWidth / 2 + boxWidth / 3}px`;
        }
        return { top, left };
      case "linkedList":
        return { top: key === "ps" || key == "p" ? "45px" : "-20px", left };
      case "doublyLinkedList":
        return { top: "-20px", left };
      default:
        return {};
    }
  }

  return (
    <div>
      {history.map((step, index) => (
        <div
          key={index}
          style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
            Action {index + 1}: {step.currentAction}
          </h4>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "20px 0", marginTop: "20px" }}>
            {step.numbers.map((number, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px",
                  margin: "2px",
                  marginBottom: "30px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                  color: step.colors[idx] === "#ACE1AF" ? "white" : "#333",
                  backgroundColor: dataStructure === "linkedList" && idx === step.numbers.length - 1 ? "black" : step.colors[idx],
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {number}
                {Object.entries(step.pointers).map(
                  ([key, pointerIdx]) => pointerIdx === idx && (
                      <div
                        key={key}
                        style={{
                          position: "absolute",
                          ...getStyleBasedOnDataStructure(dataStructure, key, pointerIdx, step.pointers),
                          transform: "translateX(-50%)",
                          width: `${boxWidth / 1.7}px`,
                          height: `${boxWidth / 2.5}px`,
                          fontSize: `${boxWidth / 4.2}px`,
                          backgroundColor: "#72A0C1",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                          borderRadius: "4px",
                          transition: "left 300ms, width 300ms, height 300ms, font-size 300ms",
                        }}
                      >
                        {key}
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryViewer;
