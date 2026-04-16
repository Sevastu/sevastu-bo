import apiClient from '@/lib/apiClient';
import { WorkerProfileStatus } from '@/lib/enums';

export interface WorkerKyc {
    userId: string;
    documentType: string;
    frontImage: string;
    backImage: string;
    status: string;
    rejectionReason?: string;
}

export interface WorkerDetails {
    profile: any;
    kyc: WorkerKyc | null;
}

type WorkerListResponse = {
    success?: boolean;
    data?: Record<string, unknown>[];
    message?: string;
};

function unwrapWorkerList(body: unknown): Record<string, unknown>[] {
    if (!body || typeof body !== 'object') return [];
    const maybeWrapped = body as WorkerListResponse;
    if (Array.isArray(maybeWrapped.data)) return maybeWrapped.data;
    if (Array.isArray(body)) return body as Record<string, unknown>[];
    return [];
}

export const fetchWorkersByStatus = async (
    status: WorkerProfileStatus = WorkerProfileStatus.UNDER_REVIEW,
): Promise<Record<string, unknown>[]> => {
    const res = await apiClient.get(`/admin/worker/list`, {
        params: { status }
    });
    return unwrapWorkerList(res.data);
};

export const fetchWorkers = async (): Promise<Record<string, unknown>[]> => {
    const res = await apiClient.get(`/admin/worker/list`);
    return unwrapWorkerList(res.data);
};

export const fetchWorkerDetails = async (userId: string): Promise<WorkerDetails> => {
    const res = await apiClient.get(`/admin/worker/${userId}`);
    const body = res.data as { data?: WorkerDetails } & WorkerDetails;
    if (body && typeof body === 'object' && 'data' in body && body.data?.profile !== undefined) {
        return body.data;
    }
    return body as WorkerDetails;
};

export const approveWorker = async (userId: string) => {
    const res = await apiClient.post(`/admin/worker/approve`, { userId });
    return res.data;
};

export const rejectWorker = async (userId: string, reason: string) => {
    const res = await apiClient.post(`/admin/worker/reject`, { userId, reason });
    return res.data;
};

export type PrivateSignedUrlResponse = {
    url: string;
    expiresInSeconds: number;
    /** ISO-8601 expiry of the presigned URL (server clock). */
    expiresAt?: string;
};

/** Admin/staff: presigned GET for a worker ID proof object key. */
export const fetchPrivateSignedUrl = async (key: string): Promise<PrivateSignedUrlResponse> => {
    const res = await apiClient.get(`/upload/private-url`, { params: { key } });
    const body = res.data as { data?: PrivateSignedUrlResponse } & PrivateSignedUrlResponse;
    if (body && typeof body === 'object' && 'data' in body && body.data?.url) {
        return body.data;
    }
    return body as PrivateSignedUrlResponse;
};
