import apiClient from '@/lib/apiClient';
import { Job, CreateJobRequest, UpdateJobRequest, JobListResponse } from '../types/job.types';

export class JobApi {
  async getJobs(params?: { status?: string; customerId?: string; page?: number; limit?: number; sort?: string; order?: string }): Promise<JobListResponse> {
    const res = await apiClient.get('/jobs', { params });
    const body = res.data as
      | Job[]
      | {
          success?: boolean;
          data?: Job[];
          pagination?: { total: number; page?: number; limit?: number };
        };

    let rows: any[] = [];
    if (Array.isArray(body)) {
      rows = body;
    } else if (body && typeof body === 'object' && Array.isArray(body.data)) {
      rows = body.data;
    }

    // Map _id to id for MongoDB compatibility
    const mappedRows = rows.map((row: any) => ({
      ...row,
      id: row.id || row._id,
    }));

    const pagination =
      body && typeof body === 'object' && !Array.isArray(body) && body.pagination
        ? body.pagination
        : { total: mappedRows.length, page: params?.page ?? 1, limit: params?.limit ?? 10 };

    return { data: mappedRows, pagination };
  }

  async getJob(jobId: string): Promise<Job> {
    const res = await apiClient.get<Job>(`/jobs/${jobId}`);
    const data = res.data as any;
    // Map _id to id for MongoDB compatibility
    return {
      ...data,
      id: data.id || data._id,
    };
  }

  async createJob(payload: CreateJobRequest): Promise<Job> {
    const res = await apiClient.post<Job>('/jobs', payload);
    return res.data;
  }

  async updateJob(jobId: string, payload: UpdateJobRequest): Promise<Job> {
    const res = await apiClient.patch<Job>(`/jobs/${jobId}`, payload);
    return res.data;
  }

  async cancelJob(jobId: string): Promise<Job> {
    const res = await apiClient.patch<Job>(`/jobs/${jobId}/cancel`);
    return res.data;
  }
}