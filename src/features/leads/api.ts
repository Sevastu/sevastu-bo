import apiClient from '@/lib/apiClient';

export interface Lead {
    id: string;
    name: string;
    email: string;
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

export const fetchLeads = async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Lead>> => {
    const res = await apiClient.get('/admin/leads', {
        params: { page, limit, search },
    });
    return res.data;
};

export const updateLeadStatus = async (id: string, status: string): Promise<Lead> => {
    const res = await apiClient.patch(`/admin/leads/${id}/status`, { status });
    return res.data.data;
};
