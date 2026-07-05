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
  customerId: string;
  customerName?: string;
  customerPhone?: string;
  categoryId: string;
  categoryName?: string;
  serviceId: string;
  serviceName?: string;
  subServiceId: string;
  subServiceName?: string;
  serviceDescription?: string;
  address: string;
  coordinates: number[];
  preferredSchedule: string;
  status: JobStatus;
  currentAssignmentId?: string;
  assignedWorkerName?: string;
  assignmentStatus?: string;
  assignedAt?: string;
  confirmedSchedule?: string;
  estimatedDuration?: number;
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
