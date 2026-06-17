import apiClient from '@/lib/apiClient';
import { Job, JobFilters, JobStats, JobStatus, MatchedWorker } from './types';

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

export const fetchJobStats = async (): Promise<JobStats> => {
    // Derive counts from the existing /admin/jobs endpoint using per-status
    // pagination queries (limit=1) — no dedicated stats endpoint needed.
    const [total, cancelled, assigned, inProgress, open, completed] = await Promise.all([
        fetchJobs({ status: 'all',                    page: 1, limit: 1 }).then(r => r.pagination.total),
        fetchJobs({ status: JobStatus.CANCELLED,      page: 1, limit: 1 }).then(r => r.pagination.total),
        fetchJobs({ status: JobStatus.ASSIGNED,       page: 1, limit: 1 }).then(r => r.pagination.total),
        fetchJobs({ status: JobStatus.IN_PROGRESS,    page: 1, limit: 1 }).then(r => r.pagination.total),
        fetchJobs({ status: JobStatus.OPEN,           page: 1, limit: 1 }).then(r => r.pagination.total),
        fetchJobs({ status: JobStatus.COMPLETED,      page: 1, limit: 1 }).then(r => r.pagination.total),
    ]);

    return { total, cancelled, assigned, inProgress, open, completed };
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
    const res = await apiClient.get(`/admin/jobs/${id}/best-workers`);
    const body = res.data as {
        success?: boolean;
        data?: MatchedWorker[];
    };
    
    return body.data || [];
};

export const reassignJob = async (id: string, workerId: string) => {
    const res = await apiClient.patch<Job>(`/admin/jobs/${id}/reassign`, { workerId });
    return res.data;
};
