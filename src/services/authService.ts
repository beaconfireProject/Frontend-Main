// src/services/authService.ts

import axiosInstance from '../utils/axiosInstance';
import axios from 'axios'; // Import axios specifically for error type checking

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginSuccessResponse {
  role: string;
  token: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  token: string;
}

// No specific success response interface needed for register as it returns empty 200

export const login = async (credentials: LoginRequest): Promise<LoginSuccessResponse> => {
  try {
    const response = await axiosInstance.post<LoginSuccessResponse>('/api/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'An unknown error occurred during login.';
    throw new Error(errorMessage);
  }
};

export const register = async (form: RegisterRequest): Promise<void> => { // Returns void on success
  try {
    // The actual API call to the backend
    await axiosInstance.post('/api/auth/register', form);
    // If we reach here, it means a 200 OK was received with no body.
    // The function resolves without returning any data.
  } catch (error: unknown) {
    let errorMessage = 'Registration failed due to an unexpected error.';

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        // Backend returns raw string for 400 validation errors
        errorMessage = error.response.data || errorMessage;
      } else if (error.response.status === 401) {
        // Backend returns JSON { message: "..." } for 401
        errorMessage = error.response.data?.message || errorMessage;
      }
    }
    throw new Error(errorMessage);
  }
};