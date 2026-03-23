import apiClient from '@/lib/apiClient';

export interface DashboardStats {
    totalUsers: number;
    activeJobs: number;
    openLeads: number;
    revenue: string;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
    const res = await apiClient.get('/admin/dashboard/stats');
    return res.data.data;
};
