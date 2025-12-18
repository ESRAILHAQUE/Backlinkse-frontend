/**
 * Guest Posting Packages API Service Functions
 */

import { api } from './api';

export interface GuestPostingPackage {
    _id: string;
    name: string;
    price: number | null; // null means "Custom"
    description: string;
    features: string[];
    icon: string;
    popular: boolean;
    enabled: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface PackagesResponse {
    packages: GuestPostingPackage[];
}

/**
 * Get public guest posting packages (for users)
 */
export const getPublicPackages = async (): Promise<PackagesResponse> => {
    const response = await api.get<PackagesResponse>('/guest-posting-packages/public');
    return response.data!;
};

/**
 * Get all guest posting packages (admin only)
 */
export const getAllPackages = async (): Promise<PackagesResponse> => {
    const response = await api.get<PackagesResponse>('/guest-posting-packages');
    return response.data!;
};

/**
 * Create guest posting package (admin only)
 */
export const createPackage = async (data: {
    name: string;
    price: number | null | 'Custom';
    description: string;
    features: string[];
    icon?: string;
    popular?: boolean;
    enabled?: boolean;
    sortOrder?: number;
}): Promise<{ package: GuestPostingPackage }> => {
    const response = await api.post<{ package: GuestPostingPackage }>('/guest-posting-packages', data);
    return response.data!;
};

/**
 * Update guest posting package (admin only)
 */
export const updatePackage = async (
    id: string,
    data: Partial<{
        name: string;
        price: number | null | 'Custom';
        description: string;
        features: string[];
        icon: string;
        popular: boolean;
        enabled: boolean;
        sortOrder: number;
    }>
): Promise<{ package: GuestPostingPackage }> => {
    const response = await api.patch<{ package: GuestPostingPackage }>(`/guest-posting-packages/${id}`, data);
    return response.data!;
};

/**
 * Delete guest posting package (admin only)
 */
export const deletePackage = async (id: string): Promise<void> => {
    await api.delete(`/guest-posting-packages/${id}`);
};

