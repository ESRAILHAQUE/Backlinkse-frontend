/**
 * Link Building Packages API Service Functions
 */

import { api } from './api';

export interface LinkBuildingPackage {
    _id: string;
    name: string;
    price: number | null; // null means "Custom"
    linksPerMonth: string;
    features: string[];
    popular: boolean;
    enabled: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface PackagesResponse {
    packages: LinkBuildingPackage[];
}

/**
 * Get public link building packages (for users)
 */
export const getPublicPackages = async (): Promise<PackagesResponse> => {
    const response = await api.get<PackagesResponse>('/link-building-packages/public');
    return response.data!;
};

/**
 * Get all link building packages (admin only)
 */
export const getAllPackages = async (): Promise<PackagesResponse> => {
    const response = await api.get<PackagesResponse>('/link-building-packages');
    return response.data!;
};

/**
 * Create link building package (admin only)
 */
export const createPackage = async (data: {
    name: string;
    price: number | null | 'Custom';
    linksPerMonth: string;
    features: string[];
    popular?: boolean;
    enabled?: boolean;
    sortOrder?: number;
}): Promise<{ package: LinkBuildingPackage }> => {
    const response = await api.post<{ package: LinkBuildingPackage }>('/link-building-packages', data);
    return response.data!;
};

/**
 * Update link building package (admin only)
 */
export const updatePackage = async (
    id: string,
    data: Partial<{
        name: string;
        price: number | null | 'Custom';
        linksPerMonth: string;
        features: string[];
        popular: boolean;
        enabled: boolean;
        sortOrder: number;
    }>
): Promise<{ package: LinkBuildingPackage }> => {
    const response = await api.patch<{ package: LinkBuildingPackage }>(`/link-building-packages/${id}`, data);
    return response.data!;
};

/**
 * Delete link building package (admin only)
 */
export const deletePackage = async (id: string): Promise<void> => {
    await api.delete(`/link-building-packages/${id}`);
};

