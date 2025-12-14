/**
 * Reports API Service Functions
 */

import { api } from './api';

export interface Report {
    _id: string;
    name: string;
    type: 'Monthly' | 'Quarterly' | 'Yearly' | 'Custom';
    reportDate: string;
    linksCount: number;
    status: 'In Progress' | 'Ready';
    fileUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReportsStats {
    totalReports: number;
    linksThisYear: number;
    avgMonthlyLinks: number;
}

export interface ReportsResponse {
    reports: Report[];
    stats: ReportsStats;
}

/**
 * Get all reports
 */
export const getAllReports = async (): Promise<ReportsResponse> => {
    const response = await api.get<ReportsResponse>('/reports');
    return response.data!;
};

/**
 * Get report by ID
 */
export const getReportById = async (id: string): Promise<Report> => {
    const response = await api.get<{ report: Report }>(`/reports/${id}`);
    return response.data!.report;
};

/**
 * Create new report
 */
export const createReport = async (data: {
    name: string;
    type: 'Monthly' | 'Quarterly' | 'Yearly' | 'Custom';
    reportDate: string;
    linksCount?: number;
}): Promise<Report> => {
    const response = await api.post<{ report: Report }>('/reports', data);
    return response.data!.report;
};

/**
 * Update report
 */
export const updateReport = async (
    id: string,
    data: Partial<{
        status: 'In Progress' | 'Ready';
        fileUrl: string;
    }>
): Promise<Report> => {
    const response = await api.patch<{ report: Report }>(`/reports/${id}`, data);
    return response.data!.report;
};

