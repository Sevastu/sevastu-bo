import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/common.types';

export class WorkflowRepository {
  async getAllPolicies(): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get('/admin/workflow-policies');
    return data;
  }

  async getPoliciesByType(type: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get(`/admin/workflow-policies/type/${type}`);
    return data;
  }

  async createPolicy(payload: any): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post('/admin/workflow-policies', payload);
    return data;
  }

  async updatePolicy(id: string, payload: any): Promise<ApiResponse<any>> {
    const { data } = await apiClient.put(`/admin/workflow-policies/${id}`, payload);
    return data;
  }

  async deletePolicy(id: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.delete(`/admin/workflow-policies/${id}`);
    return data;
  }
}

export const workflowRepository = new WorkflowRepository();
