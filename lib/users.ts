/**
 * Users Service
 * Handles user-related API calls
 */

import { api } from './api';

export interface User {
    _id: string;
    name: string;
    email: string;
    role?: 'admin' | 'moderator' | 'user';
    isVerified?: boolean;
    isSuspended?: boolean;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    role?: 'admin' | 'moderator' | 'user';
    isVerified?: boolean;
    isSuspended?: boolean;
    isActive?: boolean;
    isDeleted?: boolean;
}

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<{ users: User[]; count: number }> => {
    const response = await api.get<{ users: User[]; count: number }>('/users');
    return response.data || { users: [], count: 0 };
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string): Promise<User> => {
    const response = await api.get<{ user: User }>(`/users/${id}`);
    return response.data!.user;
};

/**
 * Create new user
 */
export const createUser = async (data: CreateUserData): Promise<User> => {
    const response = await api.post<{ user: User }>('/users', data);
    return response.data!.user;
};

/**
 * Update user
 */
export const updateUser = async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await api.patch<{ user: User }>(`/users/${id}`, data);
    return response.data!.user;
};

/**
 * Delete user
 */
export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
};

/**
 * Approve (verify) a user
 */
export const approveUser = async (id: string): Promise<User> => {
    const response = await api.patch<{ user: User }>(`/users/${id}/verify`);
    return response.data!.user;
};

/**
 * Suspend a user (disable access)
 */
export const suspendUser = async (id: string): Promise<User> => {
    const response = await api.patch<{ user: User }>(`/users/${id}`, {
        isSuspended: true,
        isActive: false,
    });
    return response.data!.user;
};

/**
 * Activate a user (re-enable access)
 */
export const activateUser = async (id: string): Promise<User> => {
    const response = await api.patch<{ user: User }>(`/users/${id}`, {
        isSuspended: false,
        isActive: true,
        isDeleted: false,
    });
    return response.data!.user;
};

