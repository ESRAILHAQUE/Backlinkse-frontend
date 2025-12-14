/**
 * Dashboard API Service Functions
 * Handles all dashboard-related API calls
 */

import { api } from './api';

export interface DashboardStats {
    totalBacklinks: number;
    avgDomainRating: number;
    activeCampaigns: number;
    estTrafficValue: string;
    backlinksChange: string;
}

export interface Activity {
    action: string;
    site: string;
    dr: number | null;
    time: string;
}

export interface CampaignProgress {
    packageName: string;
    linksDelivered: number;
    linksTotal: number;
    progress: number;
    remaining: number;
    nextReportDate: string;
}

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data!;
};

/**
 * Get recent activity
 */
export const getRecentActivity = async (): Promise<Activity[]> => {
    const response = await api.get<{ activities: Activity[] }>('/dashboard/activity');
    return response.data!.activities;
};

/**
 * Get campaign progress
 */
export const getCampaignProgress = async (): Promise<CampaignProgress | null> => {
    const response = await api.get<{ campaign: CampaignProgress | null }>('/dashboard/campaign-progress');
    return response.data!.campaign;
};

