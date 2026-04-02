import apiClient from '@/lib/apiClient';

export interface DashboardStats {
    totalUsers: number;
    activeJobs: number;
    openLeads: number;
    revenue: string;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
    try {
        const res = await apiClient.get('/admin/dashboard/stats');
        const data = res.data?.data;
        
        return {
            totalUsers: data?.totalUsers ?? 0,
            activeJobs: data?.activeJobs ?? 0,
            openLeads: data?.openLeads ?? 0,
            revenue: data?.revenue ?? "₹0",
        };
    } catch (error) {
        console.error("API error in fetchDashboardStats:", error);
        throw error;
    }
};
