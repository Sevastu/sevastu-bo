import apiClient from '@/lib/apiClient';
import { ApiResponse, PaginationParams } from '@/types/common.types';

export class JobsRepository {
  async getJobs(params: Record<string, any>): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get('/jobs', { params });
    if (data && data.data && Array.isArray(data.data)) {
      data.data = data.data.map((item: any) => ({
        ...item,
        id: item.id || item._id,
      }));
    } else if (Array.isArray(data)) {
      return { data: data.map((item: any) => ({ ...item, id: item.id || item._id })), success: true } as any;
    }
    return data;
  }

  async getJob(id: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get(`/jobs/${id}`);
    const jobData = data.data || data;
    if (jobData) {
      jobData.id = jobData.id || jobData._id;
    }
    return { data: jobData, success: true };
  }

  async createJob(payload: any): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post('/jobs', payload);
    return data;
  }

  async updateJob(id: string, payload: any): Promise<ApiResponse<any>> {
    const { data } = await apiClient.patch(`/jobs/${id}`, payload);
    return data;
  }

  async cancelJob(id: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.patch(`/jobs/${id}/cancel`);
    return data;
  }

  async getJobStats() {
    const response = await apiClient.get("/jobs/stats");
    return response.data.data;
  }
}

export const jobsRepository = new JobsRepository();