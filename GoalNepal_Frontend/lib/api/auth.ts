/**
 * Authentication API calls
 * Handles login and registration
 */

import axiosInstance from "./axios";
import { API } from "./endpoints";

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data?: unknown;
  message: string;
  token?: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const response = await axiosInstance.post<AuthResponse>(API.AUTH.LOGIN, loginData);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    throw new Error(errorMessage);
  }
};

export const register = async (registrationData: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.post<AuthResponse>(API.AUTH.REGISTER, registrationData);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    throw new Error(errorMessage);
  }
};