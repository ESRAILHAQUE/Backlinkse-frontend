/**
 * Global Settings API Service Functions
 */

import { api } from './api';

export interface GlobalSettings {
    _id: string;
    siteLogo: string;
    favicon: string;
    siteName: string;
    tagline: string;
    contactEmail: string;
    supportEmail: string;
    whatsappNumber: string;
    businessAddress: string;
    calendlyLink: string;
    dashboardUrl: string;
    caseStudiesExternalUrl: string;
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    googleAnalyticsId: string;
    adminEmail: string;
    twoFactorAuthEnabled: boolean;
    sessionExpiryEnabled: boolean;
    activityLoggingEnabled: boolean;
    bruteForceProtectionEnabled: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateGlobalSettingsData {
    siteLogo?: string;
    favicon?: string;
    siteName?: string;
    tagline?: string;
    contactEmail?: string;
    supportEmail?: string;
    whatsappNumber?: string;
    businessAddress?: string;
    calendlyLink?: string;
    dashboardUrl?: string;
    caseStudiesExternalUrl?: string;
    defaultMetaTitle?: string;
    defaultMetaDescription?: string;
    googleAnalyticsId?: string;
    adminEmail?: string;
    twoFactorAuthEnabled?: boolean;
    sessionExpiryEnabled?: boolean;
    activityLoggingEnabled?: boolean;
    bruteForceProtectionEnabled?: boolean;
    isActive?: boolean;
}

export interface UpdateGlobalSettingsData extends Partial<CreateGlobalSettingsData> { }

/**
 * Get active global settings
 */
export const getActiveGlobalSettings = async (): Promise<GlobalSettings> => {
    const response = await api.get<{ settings: GlobalSettings }>('/settings');
    return response.data!.settings;
};

/**
 * Get all global settings (Admin only)
 */
export const getAllGlobalSettings = async (): Promise<GlobalSettings[]> => {
    const response = await api.get<{ settings: GlobalSettings[] }>('/settings/admin/all');
    return response.data!.settings;
};

/**
 * Get settings by ID
 */
export const getGlobalSettingsById = async (id: string): Promise<GlobalSettings> => {
    const response = await api.get<{ settings: GlobalSettings }>(`/settings/admin/${id}`);
    return response.data!.settings;
};

/**
 * Create global settings
 */
export const createGlobalSettings = async (data: CreateGlobalSettingsData): Promise<GlobalSettings> => {
    const response = await api.post<{ settings: GlobalSettings }>('/settings/admin', data);
    return response.data!.settings;
};

/**
 * Update global settings
 */
export const updateGlobalSettings = async (id: string, data: UpdateGlobalSettingsData): Promise<GlobalSettings> => {
    const response = await api.patch<{ settings: GlobalSettings }>(`/settings/admin/${id}`, data);
    return response.data!.settings;
};

/**
 * Update active global settings
 */
export const updateActiveGlobalSettings = async (data: UpdateGlobalSettingsData): Promise<GlobalSettings> => {
    const response = await api.patch<{ settings: GlobalSettings }>('/settings', data);
    return response.data!.settings;
};

/**
 * Delete global settings
 */
export const deleteGlobalSettings = async (id: string): Promise<void> => {
    await api.delete(`/settings/admin/${id}`);
};

