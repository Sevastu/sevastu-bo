import apiClient from '@/lib/apiClient';
import { WorkerProfileStatus } from '@/lib/enums';
import { User } from '../users/api';

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

export const fetchWorkersByStatus = async (status: WorkerProfileStatus = WorkerProfileStatus.UNDER_REVIEW) => {
    const res = await apiClient.get(`/admin/worker/list`, {
        params: { status }
    });
    return res.data;
};

export const fetchWorkerDetails = async (userId: string): Promise<WorkerDetails> => {
    const res = await apiClient.get(`/admin/worker/${userId}`);
    return res.data;
};

export const approveWorker = async (userId: string) => {
    const res = await apiClient.post(`/admin/worker/approve`, { userId });
    return res.data;
};

export const rejectWorker = async (userId: string, reason: string) => {
    const res = await apiClient.post(`/admin/worker/reject`, { userId, reason });
    return res.data;
};
