import React from 'react';
import { motion } from 'framer-motion';
import { type UploadStatus } from '../types';
import '../css/ResultDisplay.css';

interface ResultDisplayProps {
  message: string;
  status: UploadStatus;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ message, status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <i className="fas fa-check-circle"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle"></i>;
      default:
        return null;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return '';
    }
  };

  return (
    <motion.div
      className={`result-display ${getStatusClass()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="result-icon">{getStatusIcon()}</div>
      <div className="result-message">{message}</div>
    </motion.div>
  );
};

export default ResultDisplay;
