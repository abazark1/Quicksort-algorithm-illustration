import React from 'react';
import './Modal.css';

const ScoreModal = ({ onClose, score, totalQuestions }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Test Result</h2>
        <p>Your score is {score}/{totalQuestions}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ScoreModal;
