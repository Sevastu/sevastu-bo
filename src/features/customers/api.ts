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

    return { data: rows, pagination };
};

export const fetchCustomerById = async (id: string) => {
    const res = await apiClient.get<Customer>(`/admin/users/${id}`);
    return res.data;
};

export const updateCustomerStatus = async (id: string, status: 'active' | 'inactive') => {
    const res = await apiClient.patch<Customer>(`/admin/users/${id}/status`, { status });
    return res.data;
};

export const fetchCustomerAnalytics = async () => {
    try {
        const res = await apiClient.get('/admin/users/analytics');
        const body = res.data as {
            success?: boolean;
            data?: CustomerAnalytics;
        };
        
        // Handle both successful response and error cases
        if (body.success && body.data) {
            return body.data;
        } else {
            console.error("Analytics endpoint error:", body);
            // Return fallback data when endpoint fails
            return {
                totalCustomers: 0,
                activeCustomers: 0,
                inactiveCustomers: 0,
                retentionRate: 0,
                averageLifetimeValue: 0
            };
        }
    } catch (error) {
        console.error("Analytics endpoint not available, using fallback data:", error);
        return {
            totalCustomers: 0,
            activeCustomers: 0,
            inactiveCustomers: 0,
            retentionRate: 0,
            averageLifetimeValue: 0
        };
    }
};
