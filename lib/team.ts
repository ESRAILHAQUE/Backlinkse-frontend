/**
 * Team API Service Functions
 */

import { api } from './api';

export interface TeamMember {
    name: string;
    email: string;
    role: 'Owner' | 'Admin' | 'Editor' | 'Viewer';
    initials: string;
    status?: 'Pending' | 'Active' | 'Inactive';
}

/**
 * Get all team members
 */
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
    const response = await api.get<{ members: TeamMember[] }>('/team');
    return response.data!.members;
};

/**
 * Invite team member
 */
export const inviteTeamMember = async (data: {
    email: string;
    role: 'Admin' | 'Editor' | 'Viewer';
}): Promise<void> => {
    await api.post('/team/invite', data);
};

/**
 * Remove team member
 */
export const removeTeamMember = async (id: string): Promise<void> => {
    await api.delete(`/team/${id}`);
};

