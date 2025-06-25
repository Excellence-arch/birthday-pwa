import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { type FileInfo } from '../types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  fileInfo: FileInfo | null;
  isActive: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  fileInfo,
  isActive,
}) => {
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isActive) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect, isActive]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && isActive) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileSelect(file);
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      className={`upload-zone ${fileInfo ? 'has-file' : ''} ${
        !isActive ? 'disabled' : ''
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      whileHover={isActive && !fileInfo ? { scale: 1.01 } : {}}
    >
      {!fileInfo ? (
        <>
          <div className="upload-icon">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <h3>Drag & Drop your CSV file here</h3>
          <p className="or-divider">or</p>
          <motion.button
            className="browse-button"
            onClick={() => document.getElementById('fileInput')?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Select File
          </motion.button>
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileInput}
          />
        </>
      ) : (
        <div className="file-preview">
          <div className="file-icon">
            <i className="fas fa-file-csv"></i>
          </div>
          <div className="file-details">
            <h4>{fileInfo.name}</h4>
            <p>{formatFileSize(fileInfo.size)}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FileUpload;
