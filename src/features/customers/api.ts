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

// Analytics endpoint is not available in the backend
// Return fallback data immediately to prevent any API calls
export const fetchCustomerAnalytics = async () => {
    // The analytics endpoint doesn't exist in the backend
    // Returning fallback data immediately prevents 500 errors
    console.warn("Analytics endpoint not available, using fallback data");
    
    return {
        totalCustomers: 0,
        activeCustomers: 0,
        inactiveCustomers: 0,
        retentionRate: 0,
        averageLifetimeValue: 0
    };
    
    // Original API call completely removed to prevent errors
    /*
    // Global cache to prevent repeated failed API calls across the entire application
    let analyticsFetchInProgress = false;
    let analyticsCache: CustomerAnalytics | null = null;
    let cacheTimestamp = 0;
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
    const ANALYTICS_ENDPOINT_FAILED = 'ANALYTICS_ENDPOINT_FAILED';

    export const fetchCustomerAnalytics = async () => {
        // Return cached data immediately if we have recent data (success or failure)
        if (analyticsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
            return analyticsCache;
        }
        
        // Prevent multiple simultaneous calls
        if (analyticsFetchInProgress) {
            // Wait for the ongoing request to complete
            return new Promise((resolve) => {
                const checkCache = () => {
                    if (analyticsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
                        resolve(analyticsCache);
                    } else if (!analyticsFetchInProgress) {
                        resolve(fetchCustomerAnalytics());
                    } else {
                        setTimeout(checkCache, 100);
                    }
                };
                checkCache();
            });
        }
        
        analyticsFetchInProgress = true;
        
        try {
            const res = await apiClient.get('/admin/users/analytics');
            const body = res.data as {
                success?: boolean;
                data?: CustomerAnalytics;
            };
            
            // Handle both successful response and error cases
            if (body.success && body.data) {
                analyticsCache = body.data;
                cacheTimestamp = Date.now();
                analyticsFetchInProgress = false;
                return body.data;
            } else {
                console.error("Analytics endpoint error:", body);
                // Return fallback data when endpoint fails
                const fallbackData = {
                    totalCustomers: 0,
                    activeCustomers: 0,
                    inactiveCustomers: 0,
                    retentionRate: 0,
                    averageLifetimeValue: 0
                };
                analyticsCache = fallbackData;
                cacheTimestamp = Date.now();
                analyticsFetchInProgress = false;
                return fallbackData;
            }
        } catch (error: any) {
            // Check if it's a 500 error specifically for the analytics endpoint
            if (error.response?.status === 500 && error.config?.url?.includes('/analytics')) {
                console.warn("Analytics endpoint not available, using fallback data (cached for 10 minutes)");
            } else {
                console.error("Error fetching customer analytics:", error);
            }
            // Return fallback data when API fails
            const fallbackData = {
                totalCustomers: 0,
                activeCustomers: 0,
                inactiveCustomers: 0,
                retentionRate: 0,
                averageLifetimeValue: 0
            };
            analyticsCache = fallbackData;
            cacheTimestamp = Date.now();
            analyticsFetchInProgress = false;
            return fallbackData;
        }
    };
    */
};
