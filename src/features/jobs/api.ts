import apiClient from '@/lib/apiClient';
import { Job, JobFilters, JobStatus, MatchedWorker } from './types';

export const fetchJobs = async (filters: JobFilters & { page?: number; limit?: number }) => {
    const res = await apiClient.get('/admin/jobs', { params: filters });
    const body = res.data as
        | Job[]
        | {
              success?: boolean;
              data?: Job[];
              pagination?: { total: number; page?: number; limit?: number };
          };

    let rows: Job[] = [];
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

export const fetchJobById = async (id: string) => {
    const res = await apiClient.get<Job>(`/admin/jobs/${id}`);
    return res.data;
};

export const cancelJob = async (id: string, reason: string) => {
    const res = await apiClient.patch<Job>(`/admin/jobs/${id}/status`, { 
        status: JobStatus.CANCELLED,
        context: reason 
    });
    return res.data;
};

export const updateJobStatus = async (id: string, status: JobStatus, context?: string) => {
    const res = await apiClient.patch<Job>(`/admin/jobs/${id}/status`, { 
        status,
        context 
    });
    return res.data;
};

export const fetchBestWorkers = async (id: string) => {
    const res = await apiClient.get<MatchedWorker[]>(`/admin/jobs/${id}/best-workers`);
    return res.data;
};

export const reassignJob = async (id: string, workerId: string) => {
    const res = await apiClient.patch<Job>(`/admin/jobs/${id}/reassign`, { workerId });
    return res.data;
};
