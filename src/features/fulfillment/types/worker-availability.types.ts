export enum WorkerAvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  ON_LEAVE = 'ON_LEAVE',
  BLOCKED = 'BLOCKED',
}

export interface WorkloadMetrics {
  jobsToday: number;
  activeJobs: number;
  completedToday: number;
  upcomingJobs: number;
  averageResponseTime: string; // e.g. "15 mins"
  acceptanceRate: number; // e.g. 98
  completionRate: number; // e.g. 99
}

export interface ConflictIndicator {
  type: 'SCHEDULE_CONFLICT' | 'OUTSIDE_WORKING_HOURS' | 'ON_LEAVE' | 'BLOCKED_SLOT' | 'ALREADY_ASSIGNED' | 'OVER_CAPACITY';
  title: string;
  reason: string;
  resolution?: string;
}

export interface NextAvailableSlot {
  label: string; // e.g. "Today", "Tomorrow"
  time: string; // e.g. "4:30 PM"
}

export interface WorkerAvailabilityProfile {
  id: string;
  name: string;
  rating: number;
  experience: string;
  distance: string;
  status: WorkerAvailabilityStatus;
  statusDetail?: string; // e.g. "2 Active Jobs" or "Today - Tomorrow" for leave
  recommendationScore: number;
  workload: WorkloadMetrics;
  nextAvailableSlot?: NextAvailableSlot;
  conflicts: ConflictIndicator[];
  email: string;
  phone: string;
  recentlyActive: string; // ISO date string
}
