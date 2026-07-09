import apiClient from '@/lib/apiClient';
import { Assignment } from '../types/assignment.types';

export class AssignmentApi {
  // TODO: Backend endpoint GET /assignments not implemented
  // async getAssignments(params?: { jobId?: string; workerId?: string; status?: string; page?: number; limit?: number }): Promise<AssignmentListResponse> {
  //   const res = await apiClient.get<AssignmentListResponse>('/assignments', { params });
  //   return res.data;
  // }

  // TODO: Backend endpoint GET /assignments/{id} not implemented
  // async getAssignment(assignmentId: string): Promise<Assignment> {
  //   const res = await apiClient.get<Assignment>(`/assignments/${assignmentId}`);
  //   return res.data;
  // }

  async createAssignment(jobId: string, workerId: string): Promise<Assignment> {
    const res = await apiClient.post<Assignment>(`/admin/jobs/${jobId}/assign/${workerId}`);
    return res.data;
  }

  // TODO: Backend endpoint PATCH /assignments/{id} not implemented
  // async updateAssignment(assignmentId: string, payload: { status?: string }): Promise<Assignment> {
  //   const res = await apiClient.patch<Assignment>(`/assignments/${assignmentId}`, payload);
  //   return res.data;
  // }

  async acceptAssignment(assignmentId: string): Promise<Assignment> {
    const res = await apiClient.post<Assignment>(`/admin/assignments/${assignmentId}/accept`);
    return res.data;
  }

  async startAssignment(assignmentId: string): Promise<Assignment> {
    const res = await apiClient.post<Assignment>(`/admin/assignments/${assignmentId}/start`);
    return res.data;
  }

  async completeAssignment(assignmentId: string): Promise<Assignment> {
    const res = await apiClient.post<Assignment>(`/admin/assignments/${assignmentId}/complete`);
    return res.data;
  }

  async cancelAssignment(assignmentId: string): Promise<Assignment> {
    const res = await apiClient.post<Assignment>(`/admin/assignments/${assignmentId}/cancel`);
    return res.data;
  }

  // TODO: Backend endpoint POST /assignments/{id}/replace not implemented
  // async replaceAssignment(assignmentId: string, payload: { newWorkerId: string }): Promise<Assignment> {
  //   const res = await apiClient.post<Assignment>(`/assignments/${assignmentId}/replace`, payload);
  //   return res.data;
  // }
}