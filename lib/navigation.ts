/**
 * Navigation API Service Functions
 */

import { api } from './api';

export interface NavigationLink {
    label: string;
    href: string;
    visible: boolean;
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface HeaderCTA {
    text: string;
    href: string;
    visible: boolean;
    showWhenLoggedIn?: boolean;
}

export interface Navigation {
    _id: string;
    headerLinks: NavigationLink[];
    loginButton: HeaderCTA;
    signUpButton: HeaderCTA;
    dashboardButton: HeaderCTA;
    footerSections: FooterSection[];
    contactEmail: string;
    whatsappNumber: string;
    twitterUrl: string;
    linkedInUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateNavigationData {
    headerLinks?: NavigationLink[];
    loginButton?: HeaderCTA;
    signUpButton?: HeaderCTA;
    dashboardButton?: HeaderCTA;
    footerSections?: FooterSection[];
    contactEmail?: string;
    whatsappNumber?: string;
    twitterUrl?: string;
    linkedInUrl?: string;
    isActive?: boolean;
}

export interface UpdateNavigationData extends Partial<CreateNavigationData> { }

/**
 * Get active navigation
 */
export const getActiveNavigation = async (): Promise<Navigation> => {
    const response = await api.get<{ navigation: Navigation }>('/navigation');
    return response.data!.navigation;
};

/**
 * Get all navigations (Admin only)
 */
export const getAllNavigations = async (): Promise<Navigation[]> => {
    const response = await api.get<{ navigations: Navigation[] }>('/navigation/admin/all');
    return response.data!.navigations;
};

/**
 * Get navigation by ID
 */
export const getNavigationById = async (id: string): Promise<Navigation> => {
    const response = await api.get<{ navigation: Navigation }>(`/navigation/admin/${id}`);
    return response.data!.navigation;
};

/**
 * Create navigation
 */
export const createNavigation = async (data: CreateNavigationData): Promise<Navigation> => {
    const response = await api.post<{ navigation: Navigation }>('/navigation/admin', data);
    return response.data!.navigation;
};

/**
 * Update navigation
 */
export const updateNavigation = async (id: string, data: UpdateNavigationData): Promise<Navigation> => {
    const response = await api.patch<{ navigation: Navigation }>(`/navigation/admin/${id}`, data);
    return response.data!.navigation;
};

/**
 * Update active navigation
 */
export const updateActiveNavigation = async (data: UpdateNavigationData): Promise<Navigation> => {
    const response = await api.patch<{ navigation: Navigation }>('/navigation', data);
    return response.data!.navigation;
};

/**
 * Delete navigation
 */
export const deleteNavigation = async (id: string): Promise<void> => {
    await api.delete(`/navigation/admin/${id}`);
};

