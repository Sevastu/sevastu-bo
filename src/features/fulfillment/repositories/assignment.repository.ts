import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/common.types';

export class AssignmentRepository {
  [x: string]: any;
  async getAssignmentByJob(jobId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get(`/jobs/${jobId}/assignment`);
    return { data: data.data || data, success: true };
  }

  async assignWorker(jobId: string, workerId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/${jobId}/assign/${workerId}`);
    return data;
  }

  async acceptAssignment(assignmentId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/assignments/${assignmentId}/accept`);
    return data;
  }

  async startAssignment(assignmentId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/assignments/${assignmentId}/start`);
    return data;
  }
  
  async completeAssignment(assignmentId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/assignments/${assignmentId}/complete`);
    return data;
  }

  async cancelAssignment(assignmentId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/assignments/${assignmentId}/cancel`);
    return data;
  }
}

export const assignmentRepository = new AssignmentRepository();
