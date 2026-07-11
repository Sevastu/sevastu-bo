export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...jobKeys.lists(), { filters }] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
};

export const assignmentKeys = {
  all: ['assignments'] as const,
  lists: () => [...assignmentKeys.all, 'list'] as const,
  list: (jobId: string) => [...assignmentKeys.lists(), { jobId }] as const,
};

export const scheduleKeys = {
  all: ['schedules'] as const,
  details: () => [...scheduleKeys.all, 'detail'] as const,
  detail: (jobId: string) => [...scheduleKeys.details(), { jobId }] as const,
};

export const availabilityKeys = {
  all: ['availabilities'] as const,
  lists: () => [...availabilityKeys.all, 'list'] as const,
  list: (workerId: string, params?: Record<string, any>) => [...availabilityKeys.lists(), { workerId, ...params }] as const,
};

export const timelineKeys = {
  all: ['timelines'] as const,
  details: () => [...timelineKeys.all, 'detail'] as const,
  detail: (jobId: string) => [...timelineKeys.details(), { jobId }] as const,
};

export const workflowKeys = {
  all: ['workflows'] as const,
  policies: (jobId: string) => [...workflowKeys.all, 'policies', { jobId }] as const,
};

export const workerAvailabilityKeys = {
  all: ['workerAvailabilities'] as const,
  lists: () => [...workerAvailabilityKeys.all, 'list'] as const,
  list: (jobId: string, params?: Record<string, any>) => [...workerAvailabilityKeys.lists(), { jobId, ...params }] as const,
};
