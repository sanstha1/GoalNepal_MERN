/**
 * Server Actions for authentication
 * Used for form submissions with Next.js server-side processing
 */

'use server';

import { login, register, type LoginData } from "../api/auth"; 
import { setAuthToken, setUserData } from "../cookie";

/**
 * Handle login form submission
 */
export async function handleLogin(loginData: Record<string, unknown>) {
  try {
    const result = await login(loginData as unknown as LoginData);
    console.log('Login result:', result);
    if (result.success && result.token) {
        await setAuthToken(result.token);
        await setUserData(result.data);
        return { success: true, message: 'Login successful', data: result.data };
    }

    return { success: false, message: result.message || 'Login failed' };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: errorMessage };
  }
}

/**
 * Handle register form submission
 */
export async function handleRegister(registrationData: Record<string, unknown>) {
  try {
    const result = await register(registrationData);

    if (result.success) {
      return { success: true, message: 'Registration successful', data: result.data };
    }

    return { success: false, message: result.message || 'Registration failed' };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: errorMessage };
  }
}