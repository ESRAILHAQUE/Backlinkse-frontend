/**
 * Projects API Service Functions
 */

import { api } from './api';

export interface Project {
    _id: string;
    name: string;
    domain: string;
    status: 'Active' | 'Paused' | 'Completed';
    linksBuilt: number;
    targetLinks: number;
    startDate: string;
    lastActivity: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectStats {
    totalProjects: number;
    activeProjects: number;
    totalLinksBuilt: number;
    avgProgress: number;
}

export interface ProjectsResponse {
    projects: Project[];
    stats: ProjectStats;
}

/**
 * Get all projects
 */
export const getAllProjects = async (): Promise<ProjectsResponse> => {
    const response = await api.get<ProjectsResponse>('/projects');
    return response.data!;
};

/**
 * Get project by ID
 */
export const getProjectById = async (id: string): Promise<Project> => {
    const response = await api.get<{ project: Project }>(`/projects/${id}`);
    return response.data!.project;
};

/**
 * Create new project
 */
export const createProject = async (data: {
    name: string;
    domain: string;
    targetLinks: number;
}): Promise<Project> => {
    const response = await api.post<{ project: Project }>('/projects', data);
    return response.data!.project;
};

/**
 * Update project
 */
export const updateProject = async (
    id: string,
    data: Partial<{
        name: string;
        domain: string;
        status: 'Active' | 'Paused' | 'Completed';
        targetLinks: number;
    }>
): Promise<Project> => {
    const response = await api.patch<{ project: Project }>(`/projects/${id}`, data);
    return response.data!.project;
};

/**
 * Delete project
 */
export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};

