/**
 * Support Tickets API Service Functions
 */

import { api } from './api';

export interface SupportTicket {
    _id: string;
    userId?: string | { _id: string; name: string; email: string }; // Can be populated with user info
    ticketNumber: string;
    subject: string;
    category: 'billing' | 'technical' | 'order' | 'general';
    priority: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    message: string;
    createdAt: string;
    updatedAt: string;
    lastUpdate: string;
}

/**
 * Get all support tickets
 */
export const getAllTickets = async (): Promise<SupportTicket[]> => {
    const response = await api.get<{ tickets: SupportTicket[] }>('/support');
    return response.data!.tickets;
};

/**
 * Get ticket by ID
 */
export const getTicketById = async (id: string): Promise<SupportTicket> => {
    const response = await api.get<{ ticket: SupportTicket }>(`/support/${id}`);
    return response.data!.ticket;
};

/**
 * Create new support ticket
 */
export const createTicket = async (data: {
    subject: string;
    category: 'billing' | 'technical' | 'order' | 'general';
    priority?: 'Low' | 'Medium' | 'High';
    message: string;
}): Promise<SupportTicket> => {
    const response = await api.post<{ ticket: SupportTicket }>('/support', data);
    return response.data!.ticket;
};

/**
 * Update support ticket
 */
export const updateTicket = async (
    id: string,
    data: Partial<{
        status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
        priority: 'Low' | 'Medium' | 'High';
    }>
): Promise<SupportTicket> => {
    const response = await api.patch<{ ticket: SupportTicket }>(`/support/${id}`, data);
    return response.data!.ticket;
};

/**
 * Get all support tickets (Admin only)
 */
export const getAllTicketsAdmin = async (): Promise<SupportTicket[]> => {
    const response = await api.get<{ tickets: SupportTicket[] }>('/support/admin/all');
    return response.data!.tickets;
};

/**
 * Get ticket by ID (Admin - can access any ticket)
 */
export const getTicketByIdAdmin = async (id: string): Promise<SupportTicket> => {
    const response = await api.get<{ ticket: SupportTicket }>(`/support/admin/${id}`);
    return response.data!.ticket;
};

/**
 * Update support ticket (Admin - can update any ticket)
 */
export const updateTicketAdmin = async (
    id: string,
    data: Partial<{
        status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
        priority: 'Low' | 'Medium' | 'High';
    }>
): Promise<SupportTicket> => {
    const response = await api.patch<{ ticket: SupportTicket }>(`/support/admin/${id}`, data);
    return response.data!.ticket;
};

