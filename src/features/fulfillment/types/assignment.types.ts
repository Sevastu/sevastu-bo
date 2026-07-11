export enum AssignmentStatus {
  ASSIGNED = 'ASSIGNED',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Assignment {
  _id: string;
  jobId: string;
  workerId?: {
    _id: string;
    name?: string;
    phone?: string;
    email?: string;
  };
  status: AssignmentStatus;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentRequest {
  jobId: string;
  workerId: string;
}

export interface UpdateAssignmentRequest {
  status?: AssignmentStatus;
}