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
  id: string;
  customer?: { id: string; name?: string; phone?: string; email?: string };
  category?: { id: string; name?: string };
  service?: { id: string; name?: string };
  subService?: { id: string; name?: string };
  serviceDescription?: string;
  address: string;
  coordinates: number[];
  preferredSchedule: string;
  status: JobStatus;
  assignment?: {
    id: string;
    worker?: { id: string; name?: string; phone?: string };
    status: string;
    assignedAt?: string;
  } | null;
  confirmedSchedule?: string;
  estimatedDuration?: number;
  createdAt: string;
  updatedAt: string;
  history?: any[];
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
