import apiClient from '@/lib/apiClient';
import { WorkflowPolicy } from '../types/workflow.types';

export class WorkflowApi {
  // TODO: Backend endpoint /jobs/{jobId}/workflow not implemented
  // async getWorkflow(jobId: string): Promise<Workflow> {
  //   const res = await apiClient.get<Workflow>(`/jobs/${jobId}/workflow`);
  //   return res.data;
  // }

  // TODO: Backend endpoint /jobs/{jobId}/workflow/history not implemented
  // async getWorkflowHistory(jobId: string): Promise<WorkflowHistory> {
  //   const res = await apiClient.get<WorkflowHistory>(`/jobs/${jobId}/workflow/history`);
  //   return res.data;
  // }

  // TODO: Backend endpoint /jobs/{jobId}/workflow/state not implemented
  // async getWorkflowState(jobId: string): Promise<Workflow> {
  //   const res = await apiClient.get<Workflow>(`/jobs/${jobId}/workflow/state`);
  //   return res.data;
  // }

  // TODO: Backend endpoint /jobs/{jobId}/workflow/retry not implemented
  // async retryWorkflow(jobId: string): Promise<Workflow> {
  //   const res = await apiClient.post<Workflow>(`/jobs/${jobId}/workflow/retry`);
  //   return res.data;
  // }

  // TODO: Backend endpoint /jobs/{jobId}/workflow/restart not implemented
  // async restartWorkflow(jobId: string): Promise<Workflow> {
  //   const res = await apiClient.post<Workflow>(`/jobs/${jobId}/workflow/restart`);
  //   return res.data;
  // }

  // TODO: Backend endpoint /jobs/{jobId}/workflow/cancel not implemented
  // async cancelWorkflow(jobId: string): Promise<Workflow> {
  //   const res = await apiClient.post<Workflow>(`/jobs/${jobId}/workflow/cancel`);
  //   return res.data;
  // }

  // Backend endpoints: /admin/workflow-policies
  async getWorkflowPolicies(): Promise<WorkflowPolicy[]> {
    const res = await apiClient.get<WorkflowPolicy[]>('/admin/workflow-policies');
    return res.data;
  }

  async getWorkflowPolicy(id: string): Promise<WorkflowPolicy> {
    const res = await apiClient.get<WorkflowPolicy>(`/admin/workflow-policies/${id}`);
    return res.data;
  }

  async getWorkflowPolicyByType(type: string): Promise<WorkflowPolicy> {
    const res = await apiClient.get<WorkflowPolicy>(`/admin/workflow-policies/type/${type}`);
    return res.data;
  }
}