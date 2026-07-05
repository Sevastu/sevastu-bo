export enum ScheduleStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  RESCHEDULED = 'RESCHEDULED',
  CANCELLED = 'CANCELLED',
}

export interface Schedule {
  id: string;
  jobId: string;
  workerId: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: ScheduleStatus;
  confirmedAt?: string;
  cancelledAt?: string;
  replacementWorkerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleRequest {
  jobId: string;
  workerId: string;
  scheduledStart: string;
  scheduledEnd: string;
}

export interface UpdateScheduleRequest {
  scheduledStart?: string;
  scheduledEnd?: string;
}