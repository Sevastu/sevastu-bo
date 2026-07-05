import { Job } from './job.types';

export interface OperationsMetrics {
  pendingMatching: number;
  pendingAssignment: number;
  scheduledJobs: number;
  inProgressJobs: number;
  completedToday: number;
  cancelledToday: number;
}

export interface RecentJob extends Pick<Job, 'id' | 'customerName' | 'status' | 'assignedWorkerName' | 'createdAt'> {
  customerName: string;
  assignedWorkerName?: string;
}