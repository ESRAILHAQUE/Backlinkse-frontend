/**
 * Subscriptions API Service Functions
 */

import { api } from './api';

export interface Subscription {
    _id: string;
    userId?: string | { _id: string; name: string; email: string }; // Can be populated with user info
    planName: string;
    price: number;
    billingCycle: 'Monthly' | 'Quarterly' | 'Yearly';
    status: 'Active' | 'Cancelled' | 'Expired';
    startDate: string;
    nextBillingDate: string;
    cancelledAt?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Get current subscription
 */
export const getCurrentSubscription = async (): Promise<Subscription | null> => {
    const response = await api.get<{ subscription: Subscription | null }>('/subscriptions/current');
    return response.data!.subscription;
};

/**
 * Get all subscriptions
 */
export const getAllSubscriptions = async (): Promise<Subscription[]> => {
    const response = await api.get<{ subscriptions: Subscription[] }>('/subscriptions');
    return response.data!.subscriptions;
};

/**
 * Create subscription
 */
export const createSubscription = async (data: {
    planName: string;
    price: number;
    billingCycle: 'Monthly' | 'Quarterly' | 'Yearly';
}): Promise<Subscription> => {
    const response = await api.post<{ subscription: Subscription }>('/subscriptions', data);
    return response.data!.subscription;
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (id: string): Promise<Subscription> => {
    const response = await api.patch<{ subscription: Subscription }>(`/subscriptions/${id}/cancel`);
    return response.data!.subscription;
};

/**
 * Get all subscriptions (Admin only)
 */
export const getAllSubscriptionsAdmin = async (): Promise<Subscription[]> => {
    const response = await api.get<{ subscriptions: Subscription[] }>('/subscriptions/admin/all');
    return response.data!.subscriptions;
};

/**
 * Cancel subscription (Admin - can cancel any subscription)
 */
export const cancelSubscriptionAdmin = async (id: string): Promise<Subscription> => {
    const response = await api.patch<{ subscription: Subscription }>(`/subscriptions/${id}/cancel-admin`);
    return response.data!.subscription;
};

