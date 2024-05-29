import React, { useState, useEffect, useRef } from "react";
import { useSprings } from "react-spring";
import { compare, unlink, precede, swap, swappivot, init, move} from "../hooks/listOperations";
import useKeyboardInput from "../hooks/useKeyboardInput";
import useResponsiveLayout from "../hooks/useResponsiveLayout";
import useStepNavigator from "../hooks/useStepNavigator";

function createAnimation(WrappedComponent, formatInitialNumbers) {
  return function Animation({ initialNumbers, steps }) {
    const formattedNumbers = formatInitialNumbers([...initialNumbers]);
    const [numbers, setNumbers] = useState(formattedNumbers);
    const [colors, setColors] = useState(Array(numbers.length).fill("white"));
    const [pointers, setPointers] = useState({});
    const [queue, setQueue] = useState([...steps]);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentAction, setCurrentAction] = useState("");
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [arrowStyles, setArrowStyles] = useState({});
    const initialWidth = 50;
    const initialSpacing = 15;
    const { boxWidth, boxSpacing, updateSize } = useResponsiveLayout(
      initialWidth,
      initialSpacing,
      initialNumbers.length
    );

    const [springs, api] = useSprings(numbers.length,() => ({
        from: { transform: "translateX(0px)", scale: 1 },
        config: { tension: 210, friction: 20 },
      }),
      [numbers.length]
    );

    const toggleHistory = () => {
      setShowHistory(!showHistory);
    };

    const saveToHistory = () => {
      const newHistorySnapshot = {
        numbers: [...numbers],
        colors: [...colors],
        pointers: { ...pointers },
        currentAction: currentAction,
        stepIndex: currentStep,
      };
      setHistory([...history, newHistorySnapshot]);
    };

    const executeStep = (step) => {
      saveToHistory();
      const parts = step.split(",");
      const command = parts[0];
      const value1 = parseInt(parts[1]);
      const index1 = parseInt(parts[2]);
      const value2 = parts[3] ? parseInt(parts[3]) : null;
      const index2 = parts[4] ? parseInt(parts[4]) : null;

      switch (command) {
        case "pivot":
          setCurrentAction(`Current pivot is ${value1}`);
          setPointers((prev) => ({ ...prev, [command]: index1 }));
          break;
        case "init":
          setCurrentAction( `Initializing pointer ${parts[1]} to position with ${parts[2]}`);
          init(step, setPointers);
          break;
        case "move":
          setCurrentAction("Moving pointers to their new positions");
          move(step, numbers, setPointers);
          break;
        case "compare":
          setCurrentAction(`Comparing ${value1} with ${parseInt(value2)}`);
          compare(index1, index2, api, setPointers);
          break;
        case "unlink":
          setCurrentAction(`Unlinking ${value1}`);
          unlink(numbers, index1, api, setPointers);
          break;
        case "precede":
          setCurrentAction(`Preceding ${value1} before ${parseInt(value2)}`);
          setNumbers(precede(numbers, index1, index2, api, setPointers));
          break;
        case "swappivot":
          setCurrentAction(`Swapping ${value1} and ${parseInt(value2)}`);
          swappivot( numbers, value1, index1, value2, index2, api, setNumbers, setPointers);
          break;
        case "swap":
          setCurrentAction(`Swapping ${value1} and ${parseInt(value2)}`);
          swap(numbers, value1, index1, value2, index2, api, setNumbers, setPointers);
          break;
        case "Final":
          setCurrentAction("Here is the sorted result!");
          setColors(colors.map(() => "#ACE1AF"));
          setPointers({});
          saveToHistory();
          break;
        case "final":
          setCurrentAction(`${value1} found its final position`);
          const newColors = [...colors];
          newColors[index1] = "#ACE1AF";
          setColors(newColors);
          setPointers({});
          break;
        default:
          console.log("Unrecognized action:", parts[0]);
      }
    };

    const { nextStep, prevStep } = useStepNavigator(
      currentStep, setCurrentStep, executeStep, queue, history, 
      setHistory, setNumbers, setColors, setPointers, setCurrentAction
    );

    useEffect(() => {
      api.start((i) => ({
        backgroundColor: colors[i] || "white",
        transform: "translateX(0px)",
        opacity: 1,
      }));
    }, [colors, numbers, pointers, api]);

    useKeyboardInput(nextStep, prevStep);

    useEffect(() => {
      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
      <WrappedComponent
        numbers={numbers}
        colors={colors}
        pointers={pointers}
        springs={springs}
        api={api}
        boxWidth={boxWidth}
        boxSpacing={boxSpacing}
        currentAction={currentAction}
        nextStep={nextStep}
        prevStep={prevStep}
        toggleHistory={toggleHistory}
        showHistory={showHistory}
        history={history}
      />
    );
  };
}

export default createAnimation;
