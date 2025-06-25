export interface UploadResponse {
  imported: number;
  duplicates: number;
  error?: string;
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
