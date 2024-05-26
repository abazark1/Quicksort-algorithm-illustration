import { useState, useCallback } from "react";

const useResponsiveLayout = (initialWidth, initialSpacing, numbersLength) => {
  const [boxWidth, setBoxWidth] = useState(initialWidth);
  const [boxSpacing, setBoxSpacing] = useState(initialSpacing);

  const updateSize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const maxBoxesPerRow = screenWidth / (boxWidth + 15);
    if (numbersLength > maxBoxesPerRow) {
      const newWidth = screenWidth / (numbersLength + 1) - 15;
      setBoxWidth(Math.max(30, newWidth));
      setBoxSpacing(Math.max(10, 5));
    } else {
      setBoxWidth(initialWidth);
      setBoxSpacing(initialSpacing);
    }
  }, [boxWidth, initialWidth, initialSpacing, numbersLength]);

  return { boxWidth, boxSpacing, updateSize };
};

export default useResponsiveLayout;
