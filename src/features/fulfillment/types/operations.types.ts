import { Job } from './job.types';

export interface OperationsMetrics {
  pendingMatching: number;
  pendingAssignment: number;
  scheduledJobs: number;
  inProgressJobs: number;
  completedToday: number;
  cancelledToday: number;
}

export interface RecentJob {
  _id: string;
  customerName: string;
  status: Job['status'];
  assignedWorkerName?: string;
  createdAt: string;
}