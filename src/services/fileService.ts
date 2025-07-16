// src/services/fileService.ts
import axiosInstance from '../utils/axiosInstance'; 

// --- Interfaces for API Responses ---

interface FileUploadResponseData {
  path: string; // The S3 key/URL of the uploaded file
}

interface FileServiceResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T | null;
}

// --- File Service Functions ---

/**
 * Uploads a file to AWS S3.
 * @param file The File object to upload.
 * @returns A promise that resolves with the S3 path of the uploaded file.
 * @throws An error if the upload fails.
 */
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file); // 'file' is the required field name as per API spec

  try {
    const response = await axiosInstance.post<FileServiceResponse<FileUploadResponseData>>(
      '/api/files/upload', // Relative URL, assuming axiosInstance base URL points to gateway
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }
    );

    if (response.data.success && response.data.data?.path) {
      return response.data.data.path;
    } else {
      throw new Error(response.data.message || 'File upload failed with no specific message.');
    }
  } catch (error: any) {
    console.error('Error uploading file:', error);
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred during file upload.';
    throw new Error(errorMessage);
  }
};

/**
 * Constructs the URL for previewing a file from S3.
 * Note: The backend returns the file content directly. This function provides the URL
 * that can be used in an <img>, <object>, or <iframe> tag.
 * @param s3Key The S3 path (key) of the file.
 * @returns The full URL for file preview.
 */
export const getPreviewFileUrl = (s3Key: string): string => {
  // AxiosInstance's base URL will be prepended automatically if it's configured.
  // We need to ensure the full URL is returned for direct use in browser elements.
  // Assuming axiosInstance's base URL is something like 'http://localhost:9002'
  const baseURL = axiosInstance.defaults.baseURL || ''; // Get base URL from axiosInstance config
  return `${baseURL}/api/files/preview?path=${encodeURIComponent(s3Key)}`;
};

/**
 * Constructs the URL for downloading a file from S3.
 * @param s3Key The S3 path (key) of the file.
 * @returns The full URL for file download.
 */
export const getDownloadFileUrl = (s3Key: string): string => {
  const baseURL = axiosInstance.defaults.baseURL || '';
  return `${baseURL}/api/files/download?path=${encodeURIComponent(s3Key)}`;
};

/**
 * Deletes a file from AWS S3.
 * @param s3Key The S3 path (key) of the file to delete.
 * @returns A promise that resolves to true if deletion is successful, false otherwise.
 * @throws An error if the deletion fails.
 */
export const deleteFile = async (s3Key: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete<FileServiceResponse<null>>(
      `/api/files/delete?path=${encodeURIComponent(s3Key)}`
    );

    if (response.data.success) {
      return true;
    } else {
      throw new Error(response.data.message || 'File deletion failed with no specific message.');
    }
  } catch (error: any) {
    console.error('Error deleting file:', error);
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred during file deletion.';
    throw new Error(errorMessage);
  }
};
