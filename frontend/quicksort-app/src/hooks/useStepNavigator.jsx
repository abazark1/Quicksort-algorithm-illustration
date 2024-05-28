import { useCallback } from "react";

function useStepNavigator( currentStep, setCurrentStep, executeStep, queue, history, setHistory, setNumbers, setColors, setPointers, setCurrentAction) {
  const nextStep = useCallback(() => {
    if (currentStep < queue.length) {
      if (currentStep < history.length) {
        const nextState = history[currentStep];
        setNumbers(nextState.numbers);
        setColors(nextState.colors);
        setPointers(nextState.pointers);
        setCurrentAction(nextState.currentAction);
      } else {
        executeStep(queue[currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, queue, history, setCurrentStep, executeStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);

      const previousState = history[currentStep - 1];
      if (previousState) {
        setNumbers(previousState.numbers);
        setColors(previousState.colors);
        setPointers(previousState.pointers);
        setCurrentAction(previousState.currentAction);
      }
      setHistory(history.slice(0, -1));
    }
  }, [currentStep, history, setCurrentStep]);

  return { nextStep, prevStep };
}

export default useStepNavigator;
