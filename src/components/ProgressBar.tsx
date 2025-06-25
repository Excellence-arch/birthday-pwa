import React from 'react';
// import './ProgressBar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="progress-text">{progress}%</span>
    </div>
  );
};

export default ProgressBar;
