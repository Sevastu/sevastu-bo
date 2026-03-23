import apiClient from '@/lib/apiClient';

export interface Job {
    id: string;
    title: string;
    employer: string;
    status: string;
    createdAt: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    message?: string;
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export const fetchJobs = async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Job>> => {
    const res = await apiClient.get('/admin/jobs', {
        params: { page, limit, search },
    });
    return res.data;
};

export const updateJobStatus = async (id: string, status: string): Promise<Job> => {
    const res = await apiClient.patch(`/admin/jobs/${id}/status`, { status });
    return res.data.data;
};
