/**
 * Theme API Service Functions
 */

import { api } from './api';

export interface ColorPreset {
    name: string;
    hue: number;
    color: string;
}

export interface Theme {
    _id: string;
    activeColorHue: number;
    darkMode: boolean;
    primaryFont: string;
    headingFont: string;
    baseFontSize: string;
    borderRadius: number;
    colorPresets: ColorPreset[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateThemeData {
    activeColorHue?: number;
    darkMode?: boolean;
    primaryFont?: string;
    headingFont?: string;
    baseFontSize?: string;
    borderRadius?: number;
    colorPresets?: ColorPreset[];
    isActive?: boolean;
}

export interface UpdateThemeData extends Partial<CreateThemeData> { }

/**
 * Get active theme
 */
export const getActiveTheme = async (): Promise<Theme> => {
    const response = await api.get<{ theme: Theme }>('/theme');
    return response.data!.theme;
};

/**
 * Get all themes (Admin only)
 */
export const getAllThemes = async (): Promise<Theme[]> => {
    const response = await api.get<{ themes: Theme[] }>('/theme/admin/all');
    return response.data!.themes;
};

/**
 * Get theme by ID
 */
export const getThemeById = async (id: string): Promise<Theme> => {
    const response = await api.get<{ theme: Theme }>(`/theme/admin/${id}`);
    return response.data!.theme;
};

/**
 * Create theme
 */
export const createTheme = async (data: CreateThemeData): Promise<Theme> => {
    const response = await api.post<{ theme: Theme }>('/theme/admin', data);
    return response.data!.theme;
};

/**
 * Update theme
 */
export const updateTheme = async (id: string, data: UpdateThemeData): Promise<Theme> => {
    const response = await api.patch<{ theme: Theme }>(`/theme/admin/${id}`, data);
    return response.data!.theme;
};

/**
 * Update active theme
 */
export const updateActiveTheme = async (data: UpdateThemeData): Promise<Theme> => {
    const response = await api.patch<{ theme: Theme }>('/theme', data);
    return response.data!.theme;
};

/**
 * Delete theme
 */
export const deleteTheme = async (id: string): Promise<void> => {
    await api.delete(`/theme/admin/${id}`);
};

