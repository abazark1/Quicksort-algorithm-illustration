export const init = (message, setPointers) => {
  const parts = message.split(",");

  if (parts.length % 3 !== 1) {
    console.error("Invalid format");
    return;
  }

  const newPointers = {};

  for (let i = 1; i < parts.length; i += 3) {
    const pointer = parts[i];
    const value = parts[i + 1];
    const index = parseInt(parts[i + 2]);

    if (!isNaN(index)) {
      newPointers[pointer] = index;
    } else {
      console.error(`Invalid index for pointer ${pointer}`);
    }
  }

  setPointers((prev) => ({ ...prev, ...newPointers }));
};

export const move = (message, numbers, setPointers) => {

  const parts = message.split(",");

  if (parts.length < 3) {
    console.error("Invalid format");
    return;
  }

  if (parts[1] === 'p'){
    setPointers((prev) => {
      let newPointers = { ...prev };
      delete newPointers["q"];
      return newPointers;
    });
  }

  const newPointers = {};

  for (let i = 1; i < parts.length; i += 3) {
    const pointer = parts[i];
    const value = parts[i + 1];
    const index = parseInt(parts[i + 2]);

    if (value === "\\") {
      newPointers[pointer] = numbers.length - 2;
    } else {
      newPointers[pointer] = index;
    }
  }
  setPointers((prev) => ({ ...prev, ...newPointers }));
};

export const swap = (numbers, value1, index1, value2, index2, api, setNumbers, setPointers) => {
  const swapIdx1 = parseInt(index1);
  const swapIdx2 = parseInt(index2);
  let swapNewNumbers = [...numbers];
  [swapNewNumbers[swapIdx1], swapNewNumbers[swapIdx2]] = [
    swapNewNumbers[swapIdx2],
    swapNewNumbers[swapIdx1],
  ];
  setNumbers(swapNewNumbers);
  api.start({
    changes: (i) => (i === swapIdx1 ? swapIdx2 : i === swapIdx2 ? swapIdx1 : i),
    onRest: () => {
      let newNumbers = [...numbers];
      [newNumbers[swapIdx1], newNumbers[swapIdx2]] = [
        newNumbers[swapIdx2],
        newNumbers[swapIdx1],
      ];
      setNumbers(newNumbers);
    },
  });
};

export const swappivot = (numbers, value1, index1, value2, index2, api, setNumbers, setPointers) => {
  const idx1 = parseInt(index1);
  const idx2 = parseInt(index2);
  let newNumbers = [...numbers];
  [newNumbers[idx1], newNumbers[idx2]] = [newNumbers[idx2], newNumbers[idx1]];
  setNumbers(newNumbers);

  setPointers((prev) => {
    let newPointers = { ...prev };
    if (newPointers["pivot"] === idx1) {
      newPointers["pivot"] = idx2;
    } else if (newPointers["pivot"] === idx2) {
      newPointers["pivot"] = idx1;
    }
    return newPointers;
  });

  api.start({
    changes: (i) => (i === idx1 ? idx2 : i === idx2 ? idx1 : i),
  });
};

export const compare = (index1, index2, api, setPointers) => {
  setPointers((prev) => {
    let newPointers = { ...prev };
    delete newPointers["q"];
    return newPointers;
  });

  api.start((i) => ({
    scale: i === index1 || i === index2 ? 1.1 : 1,
    transform: "translateX(0px)",
    opacity: 1,
  }));

  setTimeout(() => {
    api.start({ scale: 1 });
  }, 1000);
};

export const unlink = (numbers, index, api, setPointers) => {
  api.start((i) => ({
    transform: i === index ? 'translateY(60px)' : 'translateY(0px)',
    opacity: 1,
    immediate: i === index
  }));
};


export const precede = (numbers, index1, index2, api, setPointers) => {
  let newNumbers = [...numbers];
  let psPosition = numbers[index1 - 1];
  let sPosition = numbers[index1];

  setPointers((prev) => {
    sPosition = prev["s"] + 1;
    return prev;
  });

  newNumbers.splice(index1, 1);

  const animations = [];
  for (let i = 0; i < index2; i++) {
    const element = newNumbers[i];
    const newIndex = newNumbers.indexOf(element);
    const xMove = newIndex - i;

    animations.push({
      target: element,
      to: { transform: `translateX(${xMove * 60}px)`, opacity: 1 },
      config: { tension: 170, friction: 26 },
    });
  }

  setPointers((prev) => {
    let newPointers = { ...prev };
    for (let key in newPointers) {
      if (newPointers[key] === index2 && key === "pivot") {
        newPointers[key] = index2 + 1;
      } else if (newPointers[key] === index1) {
        newPointers[key] = index2;
      }
    }

    for (let key in newPointers) {
      if (numbers[newPointers[key]] === psPosition && numbers[numbers.length - 1] === " ") {
        newPointers["ps"] = newNumbers.indexOf(psPosition);
      }
    }

    return newPointers;
  });

  newNumbers.splice(index2, 0, parseInt(numbers[index1]));

  api.start((i) => ({
    transform: 'translateY(0px)',
    opacity: 1,
  }));

  return newNumbers;
};
