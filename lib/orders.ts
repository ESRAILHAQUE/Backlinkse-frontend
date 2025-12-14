/**
 * Orders API Service Functions
 */

import { api } from './api';

export interface Order {
    _id: string;
    orderNumber: string;
    packageName: string;
    packageType: 'link-building' | 'guest-posting';
    status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
    linksDelivered: number;
    linksTotal: number;
    amount: number;
    currency: string;
    orderDate: string;
    completedDate?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Get all orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
    const response = await api.get<{ orders: Order[] }>('/orders');
    return response.data!.orders;
};

/**
 * Get order by ID
 */
export const getOrderById = async (id: string): Promise<Order> => {
    const response = await api.get<{ order: Order }>(`/orders/${id}`);
    return response.data!.order;
};

/**
 * Create new order
 */
export const createOrder = async (data: {
    packageName: string;
    packageType: 'link-building' | 'guest-posting';
    linksTotal: number;
    amount: number;
    currency?: string;
}): Promise<Order> => {
    const response = await api.post<{ order: Order }>('/orders', data);
    return response.data!.order;
};

/**
 * Update order
 */
export const updateOrder = async (
    id: string,
    data: Partial<{
        status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
        linksDelivered: number;
    }>
): Promise<Order> => {
    const response = await api.patch<{ order: Order }>(`/orders/${id}`, data);
    return response.data!.order;
};

