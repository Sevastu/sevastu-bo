import apiClient from '@/lib/apiClient';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
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

export const fetchUsers = async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<User>> => {
    const res = await apiClient.get('/admin/users', {
        params: { page, limit, search },
    });
    return res.data;
};

export const updateUserStatus = async (id: string, status: string): Promise<User> => {
    const res = await apiClient.patch(`/admin/users/${id}/status`, { status });
    return res.data.data;
};
