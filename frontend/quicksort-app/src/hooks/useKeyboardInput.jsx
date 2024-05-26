import { useEffect } from "react";

const useKeyboardInput = (onRightPress, onLeftPress) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ">" || event.key === "ArrowRight") {
        onRightPress();
      } else if (event.key === "<" || event.key === "ArrowLeft") {
        onLeftPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRightPress, onLeftPress]);
};

export default useKeyboardInput;
