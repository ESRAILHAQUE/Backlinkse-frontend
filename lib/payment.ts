/**
 * Payment Methods API Service Functions
 */

import { api } from './api';

export interface PaymentMethod {
    _id: string;
    type: 'Visa' | 'Mastercard' | 'American Express' | 'Discover';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Get all payment methods
 */
export const getAllPaymentMethods = async (): Promise<PaymentMethod[]> => {
    const response = await api.get<{ paymentMethods: PaymentMethod[] }>('/payment');
    return response.data!.paymentMethods;
};

/**
 * Add payment method
 */
export const addPaymentMethod = async (data: {
    type: 'Visa' | 'Mastercard' | 'American Express' | 'Discover';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault?: boolean;
}): Promise<PaymentMethod> => {
    const response = await api.post<{ paymentMethod: PaymentMethod }>('/payment', data);
    return response.data!.paymentMethod;
};

/**
 * Set default payment method
 */
export const setDefaultPaymentMethod = async (id: string): Promise<PaymentMethod> => {
    const response = await api.patch<{ paymentMethod: PaymentMethod }>(`/payment/${id}/set-default`);
    return response.data!.paymentMethod;
};

/**
 * Delete payment method
 */
export const deletePaymentMethod = async (id: string): Promise<void> => {
    await api.delete(`/payment/${id}`);
};

