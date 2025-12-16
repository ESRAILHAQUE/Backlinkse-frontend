/**
 * Live Chat API Service Functions
 */

import { api } from './api';

export interface LiveChatSettings {
    _id: string;
    enabled: boolean;
    widgetScript: string;
    displayOn: 'all' | 'homepage' | 'dashboard' | 'exclude-dashboard';
    autoReplyMessage: string;
    supportEmail: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLiveChatData {
    enabled?: boolean;
    widgetScript?: string;
    displayOn?: 'all' | 'homepage' | 'dashboard' | 'exclude-dashboard';
    autoReplyMessage?: string;
    supportEmail?: string;
    isActive?: boolean;
}

export interface UpdateLiveChatData extends Partial<CreateLiveChatData> { }

/**
 * Get active live chat settings
 */
export const getActiveLiveChat = async (): Promise<LiveChatSettings> => {
    const response = await api.get<{ liveChat: LiveChatSettings }>('/live-chat');
    return response.data!.liveChat;
};

/**
 * Get all live chat settings (Admin only)
 */
export const getAllLiveChatSettings = async (): Promise<LiveChatSettings[]> => {
    const response = await api.get<{ liveChats: LiveChatSettings[] }>('/live-chat/admin/all');
    return response.data!.liveChats;
};

/**
 * Get live chat by ID
 */
export const getLiveChatById = async (id: string): Promise<LiveChatSettings> => {
    const response = await api.get<{ liveChat: LiveChatSettings }>(`/live-chat/admin/${id}`);
    return response.data!.liveChat;
};

/**
 * Create live chat settings
 */
export const createLiveChat = async (data: CreateLiveChatData): Promise<LiveChatSettings> => {
    const response = await api.post<{ liveChat: LiveChatSettings }>('/live-chat/admin', data);
    return response.data!.liveChat;
};

/**
 * Update live chat settings
 */
export const updateLiveChat = async (id: string, data: UpdateLiveChatData): Promise<LiveChatSettings> => {
    const response = await api.patch<{ liveChat: LiveChatSettings }>(`/live-chat/admin/${id}`, data);
    return response.data!.liveChat;
};

/**
 * Update active live chat settings
 */
export const updateActiveLiveChat = async (data: UpdateLiveChatData): Promise<LiveChatSettings> => {
    const response = await api.patch<{ liveChat: LiveChatSettings }>('/live-chat', data);
    return response.data!.liveChat;
};

/**
 * Delete live chat settings
 */
export const deleteLiveChat = async (id: string): Promise<void> => {
    await api.delete(`/live-chat/admin/${id}`);
};

