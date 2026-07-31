import apiClient from '@/lib/apiClient';

export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatarUrl?: string;
    status: 'active' | 'inactive';
    joinedDate: string;
    createdAt?: string;
    totalOrders?: number;
    totalSpent?: number;
    lastActiveDate?: string;
}

export interface CustomerFilters {
    search?: string;
    status?: 'all' | 'active' | 'inactive';
    dateRange?: {
        from?: string;
        to?: string;
    };
}

export interface CustomerAnalytics {
    totalCustomers: number;
    activeCustomers: number;
    inactiveCustomers: number;
    retentionRate: number;
    averageLifetimeValue: number;
}

export const fetchCustomers = async (filters: CustomerFilters & { page?: number; limit?: number }) => {
    const res = await apiClient.get('/admin/users', { params: { ...filters, role: 'customer' } });
    // console.log('res.data', res.data.data);
    const body = res.data as {
        success?: boolean;
        data?: any[];
        pagination?: { total: number; page?: number; limit?: number };
    };

    let rows: any[] = [];
    if (Array.isArray(body)) {
        rows = body;
    } else if (body && typeof body === 'object' && Array.isArray(body.data)) {
        rows = body.data;
    }

    const pagination =
        body && typeof body === 'object' && !Array.isArray(body) && body.pagination
            ? body.pagination
            : { total: rows.length, page: filters.page ?? 1, limit: filters.limit ?? 10 };

    // Transform createdAt to joinedDate for frontend compatibility
    const transformedRows = rows.map((row: any) => ({
        ...row,
        joinedDate: row.createdAt
    }));

    return { data: transformedRows, pagination };
};

export const fetchCustomerById = async (id: string) => {
    const res = await apiClient.get(`/admin/users/${id}`);
    // Extract data from wrapped response
    const customerData = res.data?.data || res.data;
    // Transform createdAt to joinedDate for frontend compatibility
    return {
        ...customerData,
        joinedDate: customerData.createdAt
    };
};

export const updateCustomerStatus = async (id: string, status: 'active' | 'inactive') => {
    const res = await apiClient.patch<Customer>(`/admin/users/${id}/status`, { status });
    return res.data;
};

// export const fetchCustomerAnalytics = async () => {
//     const res = await apiClient.get('/admin/users/analytics');
//     return res.data as CustomerAnalytics;
// };