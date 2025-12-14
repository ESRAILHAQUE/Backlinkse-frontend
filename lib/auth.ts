/**
 * Authentication Service
 * Handles authentication-related API calls
 */

import { api, setAuthToken, setUser, removeAuthToken, getUser, getAuthToken } from './api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        _id: string;
        name: string;
        email: string;
        role?: "admin" | "moderator" | "user";
        isVerified?: boolean;
        isSuspended?: boolean;
        isActive?: boolean;
        isDeleted?: boolean;
        createdAt?: string;
        updatedAt?: string;
    };
    accessToken: string;
    refreshToken: string;
}

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);

    if (response.data) {
        setAuthToken(response.data.accessToken);
        if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        setUser(response.data.user);
    }

    return response.data!;
};

/**
 * Register new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);

    if (response.data) {
        setAuthToken(response.data.accessToken);
        if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        setUser(response.data.user);
    }

    return response.data!;
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (userId?: string): Promise<any> => {
    const endpoint = userId ? `/auth/me?userId=${userId}` : '/auth/me';
    const response = await api.get<{ user: any }>(endpoint);
    if (response.data?.user) {
        setUser(response.data.user);
    }
    return response.data?.user;
};

/**
 * Logout user
 */
export const logout = (): void => {
    removeAuthToken();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!getAuthToken() && !!getUser();
};

/**
 * Get current user from localStorage
 */
export const getCurrentUserLocal = (): any | null => {
    return getUser();
};

