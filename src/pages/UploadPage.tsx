import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import ProgressBar from '../components/ProgressBar';
import ResultDisplay from '../components/ResultDisplay';
import { uploadCSV } from '../utils/api';
import { type FileInfo, type UploadStatus } from '../types';
import './../css/uploadPage.css';

const UploadPage: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isGoogleForms, setIsGoogleForms] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);

  const handleFileSelect = useCallback((file: File) => {
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    setStatus('idle');
  }, []);

  const handleSubmit = async () => {
    if (!fileInfo) return;

    try {
      setStatus('uploading');
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      const response = await uploadCSV(fileInfo, isGoogleForms);

      setProgress(100);
      setStatus('success');

      return response;
    } catch (error) {
      setStatus('error');
      throw error;
    }
  };

  const resetUpload = () => {
    setFileInfo(null);
    setStatus('idle');
    setProgress(0);
  };

  return (
    <div className="upload-page">
      <motion.div
        className="upload-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className="upload-header">
          <div className="header-icon">
            <i className="fas fa-birthday-cake"></i>
          </div>
          <h1>Birthday Reminder</h1>
          <p>Upload your CSV file to import birthday data</p>
        </header>

        <div className="upload-content">
          <FileUpload
            onFileSelect={handleFileSelect}
            fileInfo={fileInfo}
            isActive={status === 'idle'}
          />

          <motion.div
            className="form-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: fileInfo ? 1 : 0.5,
              height: 'auto',
            }}
            transition={{ duration: 0.2 }}
          >
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={isGoogleForms}
                onChange={(e) => setIsGoogleForms(e.target.checked)}
                disabled={!fileInfo}
              />
              <span className="checkmark"></span>
              This is a Google Forms export
            </label>
          </motion.div>

          <div className="action-buttons">
            {status === 'idle' && fileInfo && (
              <motion.button
                className="upload-button primary"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-upload"></i> Upload CSV
              </motion.button>
            )}

            {(status === 'success' || status === 'error') && (
              <motion.button
                className="upload-button secondary"
                onClick={resetUpload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-redo"></i> Upload Another File
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {status === 'uploading' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <ProgressBar progress={progress} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(status === 'success' || status === 'error') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ResultDisplay
                  status={status}
                  message={
                    status === 'success'
                      ? `Successfully imported data from ${fileInfo?.name}`
                      : 'Failed to upload file. Please try again.'
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;
