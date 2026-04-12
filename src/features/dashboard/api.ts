import apiClient from '@/lib/apiClient';

/** Nest `ResponseInterceptor` wraps payloads as `{ success, data, message }`. */
function unwrap<T>(res: { data: unknown }): T {
    const body = res.data as { data?: T; success?: boolean } | T;
    if (body && typeof body === 'object' && 'data' in body && 'success' in (body as object)) {
        return (body as { data: T }).data;
    }
    return body as T;
}

export interface DashboardStats {
    totalUsers: number;
    totalCustomers: number;
    totalWorkers: number;
    activeJobs: number;
    openLeads: number;
    revenue: string;
    jobsToday: number;
    completedToday: number;
}

export interface AnalyticsData {
    _id: string; // Date
    count: number;
    revenue: number;
}

export interface WorkerPerformance {
    workerId: string;
    name: string;
    email: string;
    totalJobs: number;
    completedJobs: number;
    cancelledJobs: number;
    totalEarnings: number;
    acceptanceRate: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
    const res = await apiClient.get('/admin/dashboard/stats');
    const data = unwrap<DashboardStats | Record<string, unknown>>(res);
    const d = (data && typeof data === 'object' ? data : {}) as Partial<DashboardStats>;

    return {
        totalUsers: d.totalUsers ?? 0,
        totalCustomers: d.totalCustomers ?? 0,
        totalWorkers: d.totalWorkers ?? 0,
        activeJobs: d.activeJobs ?? 0,
        openLeads: d.openLeads ?? 0,
        revenue: d.revenue ?? '₹0',
        jobsToday: d.jobsToday ?? 0,
        completedToday: d.completedToday ?? 0,
    };
};

/** Older deployed APIs may not expose this route yet — 404 yields empty series so the dashboard still loads. */
export const fetchAnalytics = async (): Promise<AnalyticsData[]> => {
    try {
        const res = await apiClient.get('/admin/dashboard/analytics');
        const raw = unwrap<unknown>(res);
        return Array.isArray(raw) ? raw : [];
    } catch (e: unknown) {
        const status = (e as { response?: { status?: number } })?.response?.status;
        if (status === 404) return [];
        throw e;
    }
};

export const fetchWorkerPerformance = async (): Promise<WorkerPerformance[]> => {
    try {
        const res = await apiClient.get('/admin/dashboard/worker-performance');
        const raw = unwrap<unknown>(res);
        return Array.isArray(raw) ? raw : [];
    } catch (e: unknown) {
        const status = (e as { response?: { status?: number } })?.response?.status;
        if (status === 404) return [];
        throw e;
    }
};
