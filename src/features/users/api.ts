import apiClient from '@/lib/apiClient';
import { UserRole, UserStatus } from '@/lib/enums';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: UserStatus;
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

function emptyUsersPage(page: number, limit: number): PaginatedResponse<User> {
    return {
        success: true,
        data: [],
        pagination: { page, limit, total: 0 },
        message: 'Users API unavailable (404). Deploy a backend that exposes GET /admin/users.',
    };
}

export const fetchUsers = async (page = 1, limit = 10, search = '', role = ''): Promise<PaginatedResponse<User>> => {
    try {
        const res = await apiClient.get('/admin/users', {
            params: { page, limit, search, role },
        });
        const body = res.data as PaginatedResponse<User> & Record<string, unknown>;
        const list = Array.isArray(body?.data) ? body.data : [];
        const pagination = body?.pagination ?? { page, limit, total: list.length };
        return {
            success: body?.success ?? true,
            data: list,
            pagination,
            message: body?.message,
        };
    } catch (e: unknown) {
        const status = (e as { response?: { status?: number } })?.response?.status;
        if (status === 404) return emptyUsersPage(page, limit);
        throw e;
    }
};

export const updateUserStatus = async (id: string, status: string): Promise<User> => {
    const res = await apiClient.patch(`/admin/users/${id}/status`, { status });
    const body = res.data as { data?: User } | User;
    return body && typeof body === 'object' && 'data' in body ? (body as { data: User }).data : (body as User);
};
