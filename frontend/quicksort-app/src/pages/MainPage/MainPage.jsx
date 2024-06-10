import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainPage.css';
import ArrayAnimation from '../../animations/ArrayAnimation';
import LinkedListAnimation from '../../animations/LinkedListAnimation';
import DoublyLinkedListAnimation from '../../animations/DoublyLinkedListAnimation';

function Main() {
  const [lengthInput, setLengthInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [algorithmInput, setAlgorithmInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [output, setOutput] = useState('');
  const [intermediateSteps, setIntermediateSteps] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLengthChange = (event) => {
    setLengthInput(event.target.value);
    setUserInput('');
    isValidInput();
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    setLengthInput(event.target.value.split(',').map(Number).length)
    isValidInput();
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithmInput(event.target.value);
    isValidInput();
  };

  const handleRunClick = async () => {
    setIntermediateSteps([]);
    setShowInput(false);
    setErrorMessage('');

    if (!isValidInput()) {
      return;
    }

    let numbers;
    if (userInput === '') {
      numbers = Array.from({ length: lengthInput }, () => Math.floor(Math.random() * 1000));
    } else {
      numbers = userInput.split(',').map(Number);
    }

    const algorithm = algorithmInput;
    setUserInput(numbers.join(','));
    setShowInput(true);

    try {
      const response = await axios.post('http://localhost:8080//cors', {
        data: numbers,
        algorithm: algorithm
      });
      console.log(response)

      const intermediateSteps = response.data;
      setIntermediateSteps(intermediateSteps);
    } catch (error) {
      console.error(error);
    }
  };


  const isValidInput = () => {
    let isValid = true;
    const numbers = userInput.split(',').map(Number);

    if (algorithmInput === '') {
      setErrorMessage("Please choose the algorithm.");
      isValid = false;
    } else if (!isFinite(Number(lengthInput))) {
      setErrorMessage("Please enter valid length number.");
      isValid = false;
    } else if (!numbers.every(Number.isFinite)) {
      setErrorMessage("Please enter valid numbers separated by commas.");
      isValid = false;
    } else if (userInput.includes(',,') || userInput.startsWith(',') || userInput.endsWith(',')) {
      setErrorMessage("Please do not enter consecutive commas or start/end with a comma.");
      isValid = false;
    } else if (numbers.some(num => num < 0)) {
      setErrorMessage("No negative numbers.");
      isValid = false;
    } else if (numbers.some(num => num > 999)) {
      setErrorMessage("No numbers more than 999.");
      isValid = false;
    } else if (numbers.length === 0 || lengthInput.length === 0) {
      setErrorMessage("Please enter some numbers or the length input.");
      isValid = false;
    } else if (parseInt(lengthInput) > 35 || numbers.length > 35) {
      setErrorMessage("Maximum number of elements is 35");
      isValid = false;
    } else {
      setErrorMessage("");
    }
    return isValid;
  };


  let initialNumbers = userInput ? userInput.split(',').map(Number) : [];
  useEffect(() => {
    setIntermediateSteps([]);
    setShowInput(false);

  }, [algorithmInput, userInput, lengthInput]);

  return (
    <div>
      <h2>Quicksort illustation</h2>
      <h3>Enter comma-separated numbers for Quicksort:</h3>
      <input type="text" value={lengthInput} onChange={handleLengthChange} placeholder="Length (Optional)" />
      <input type="text" value={userInput} onChange={handleInputChange} placeholder="Data (Optional)" />
      <select value={algorithmInput} onChange={handleAlgorithmChange}>
        <option value="">Select Data Structure</option>
        <option value="array">Array</option>
        <option value="linkedList">Linked List</option>
        <option value="doublyLinkedList">Doubly Linked List</option>
      </select>
      <button data-testid="run-qs-button" onClick={handleRunClick}>Run Quicksort</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {intermediateSteps.length > 0 && (
        <div className="intermediate-steps-container">
          {algorithmInput === "array" && <ArrayAnimation initialNumbers={initialNumbers} steps={intermediateSteps} />}
          {algorithmInput === "linkedList" && <LinkedListAnimation initialNumbers={initialNumbers} steps={intermediateSteps} />}
          {algorithmInput === "doublyLinkedList" && <DoublyLinkedListAnimation initialNumbers={initialNumbers} steps={intermediateSteps} />}
        </div>
      )}
    </div>
  );
}

export default Main;
