import axios from 'axios';
import { type UploadResponse } from '../types';
import { type FileInfo } from '../types';

export const uploadCSV = async (
  fileData: FileInfo
  // isGoogleForms: boolean
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('csv', fileData.file, fileData.name);
  const res = axios.post(
    `${import.meta.env.VITE_BASE_URL}/import`,
    formData,
    {
      headers: {
        // 'Content-Type': 'application/json',
        // Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res
    .then((response) => {
      console.log(response);
      return response.data as UploadResponse;
    })
    .catch((error) => {
      console.error('Upload failed:', error);
      throw error;
    });
};
