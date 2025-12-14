/**
 * API Client Utility
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5004/api/v1';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface ApiError {
    success: false;
    message: string;
    error?: string;
}

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
};

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

/**
 * Get user from localStorage
 */
export const getUser = (): any | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Set user in localStorage
 */
export const setUser = (user: any): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Base fetch function with error handling
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || 'An error occurred');
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Network error occurred');
    }
}

/**
 * API Client Methods
 */
export const api = {
    /**
     * GET request
     */
    get: <T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
        return apiRequest<T>(endpoint, { ...options, method: 'GET' });
    },

    /**
     * POST request
     */
    post: <T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<ApiResponse<T>> => {
        return apiRequest<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    /**
     * PATCH request
     */
    patch: <T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<ApiResponse<T>> => {
        return apiRequest<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    /**
     * DELETE request
     */
    delete: <T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
        return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
    },
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<boolean> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5004';
        const response = await fetch(`${baseUrl}/health`);
        return response.ok;
    } catch {
        return false;
    }
};

