export enum JobStatus {
  CREATED = 'CREATED',
  MATCHING = 'MATCHING',
  WAITING_FOR_WORKERS = 'WAITING_FOR_WORKERS',
  ASSIGNED = 'ASSIGNED',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Job {
  _id: string;
  customerId?: { _id: string; name?: string; phone?: string; email?: string };
  categoryId?: { _id: string; name?: string };
  serviceId?: { _id: string; name?: string };
  subServiceIds?: { _id: string; name?: string }[];
  address: string;
  coordinates: number[];
  preferredSchedule: string;
  status: JobStatus;
  currentAssignmentId?: {
    _id: string;
    jobId: string;
    workerId?: { _id: string; name?: string; phone?: string; email?: string };
    status: string;
    createdAt?: string;
    acceptedAt?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  customerId: string;
  categoryId: string;
  serviceId: string;
  subServiceId: string;
  address: string;
  coordinates: number[];
  preferredSchedule: string;
  status?: JobStatus;
  currentAssignmentId?: string;
}

export interface UpdateJobRequest {
  customerId?: string;
  categoryId?: string;
  serviceId?: string;
  subServiceId?: string;
  address?: string;
  coordinates?: number[];
  preferredSchedule?: string;
  status?: JobStatus;
  currentAssignmentId?: string;
}

export interface JobListResponse {
  data: Job[];
  pagination: {
    total: number;
    page?: number;
    limit?: number;
  };
}
