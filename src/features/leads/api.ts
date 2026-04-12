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

function emptyLeadsPage(page: number, limit: number): PaginatedResponse<Lead> {
    return {
        success: true,
        data: [],
        pagination: { page, limit, total: 0 },
        message: 'Leads API unavailable (404). Deploy a backend that exposes GET /admin/leads.',
    };
}

export const fetchLeads = async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Lead>> => {
    try {
        const res = await apiClient.get('/admin/leads', {
            params: { page, limit, search },
        });
        const body = res.data as PaginatedResponse<Lead> & Record<string, unknown>;
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
        if (status === 404) return emptyLeadsPage(page, limit);
        throw e;
    }
};

export const updateLeadStatus = async (id: string, status: string): Promise<Lead> => {
    const res = await apiClient.patch(`/admin/leads/${id}/status`, { status });
    const body = res.data as { data?: Lead } | Lead;
    return body && typeof body === 'object' && 'data' in body ? (body as { data: Lead }).data : (body as Lead);
};
