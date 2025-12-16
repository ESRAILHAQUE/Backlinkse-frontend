/**
 * Admin Dashboard API Service Functions
 */

import { api } from './api';

export interface AdminDashboardStats {
    stats: {
        totalUsers: {
            value: string;
            change: string;
            trend: 'up' | 'down';
        };
        totalOrders: {
            value: string;
            change: string;
            trend: 'up' | 'down';
        };
        activeProjects: {
            value: string;
            change: string;
            trend: 'up' | 'down';
        };
        supportTickets: {
            value: string;
            change: string;
            trend: 'up' | 'down';
        };
        monthlyRevenue: {
            value: string;
            change: string;
            trend: 'up' | 'down';
        };
        websiteTraffic: {
            value: string;
            change: string;
            trend: 'up' | 'down';
        };
    };
}

export interface RecentActivity {
    action: string;
    user: string;
    time: string;
}

/**
 * Get admin dashboard stats
 */
export const getAdminDashboardStats = async (): Promise<AdminDashboardStats> => {
    const response = await api.get<AdminDashboardStats>('/dashboard/admin/stats');
    return response.data!;
};

/**
 * Get admin recent activity
 */
export const getAdminRecentActivity = async (): Promise<{ activities: RecentActivity[] }> => {
    const response = await api.get<{ activities: RecentActivity[] }>('/dashboard/admin/activity');
    return response.data!;
};

