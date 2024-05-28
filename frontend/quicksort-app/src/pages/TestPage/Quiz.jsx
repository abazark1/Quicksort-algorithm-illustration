import React, { useState } from "react";
import ScoreModal from "./ScoreModal";

const Quiz = ({ questions }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const score = questions.reduce((acc, curr, index) => (curr.answer === answers[index] ? acc + 1 : acc), 0);
    setScore(score);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Test Page</h2>
      {questions.map((question, index) => (
        <div key={index} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <p>{question.question}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                value={option}
                checked={answers[index] === option}
                onChange={() => handleAnswerChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button data-testid="submit-button" onClick={handleSubmit}> Submit </button>
      {showModal && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal">
            <ScoreModal onClose={handleCloseModal} score={score} totalQuestions={questions.length} />
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
