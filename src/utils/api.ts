import { type UploadResponse } from '../types';
// import { type FileInfo } from '../types';

export const uploadCSV = async (
  // fileData: FileInfo,
  // isGoogleForms: boolean
): Promise<UploadResponse> => {
  // In a real implementation, you would use FormData and fetch/axios
  // This is a mock implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate for demo
        resolve({
          imported: Math.floor(Math.random() * 100) + 50,
          duplicates: Math.floor(Math.random() * 20),
        });
      } else {
        reject(new Error('Failed to upload file. Please try again.'));
      }
    }, 1500);
  });
};
