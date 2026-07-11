import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { jobsRepository } from '../repositories/jobs.repository';
import { assignmentRepository } from '../repositories/assignment.repository';
import { scheduleRepository } from '../repositories/schedule.repository';
import { timelineRepository } from '../repositories/timeline.repository';
import { availabilityRepository } from '../repositories/availability.repository';
import { 
  jobKeys, 
  assignmentKeys, 
  scheduleKeys, 
  timelineKeys, 
  availabilityKeys 
} from '../api/queryKeys';

export function useJobDetails(jobId: string) {
  const queryClient = useQueryClient();

  // 1. Fetch Job
  const jobQuery = useQuery({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => jobsRepository.getJob(jobId),
    enabled: !!jobId,
  });

  const job = useMemo(() => jobQuery.data?.data || null, [jobQuery.data]);

  // 2. Assignment is embedded in job.currentAssignmentId
  const assignment = useMemo(() => job?.currentAssignmentId || null, [job]);

  // 3. Fetch Schedule
  const scheduleQuery = useQuery({
    queryKey: scheduleKeys.detail(jobId),
    queryFn: () => scheduleRepository.getScheduleByJob(jobId),
    enabled: !!jobId,
  });

  const schedule = useMemo(() => scheduleQuery.data?.data || null, [scheduleQuery.data]);

  // 4. Fetch Timeline
  const timelineQuery = useQuery({
    queryKey: timelineKeys.detail(jobId),
    queryFn: () => timelineRepository.getTimeline(jobId),
    enabled: !!jobId,
  });

  const timeline = useMemo(() => timelineQuery.data?.data || [], [timelineQuery.data]);

  // 5. Fetch Availability (only if a worker is assigned)
  const workerId = assignment?.workerId?._id;
  const availabilityQuery = useQuery({
    queryKey: availabilityKeys.list(workerId || ''),
    queryFn: () => availabilityRepository.getAvailability(workerId as string),
    enabled: !!workerId,
  });

  const availability = useMemo(() => availabilityQuery.data?.data || null, [availabilityQuery.data]);

  // Aggregated Loading and Error States
  const isLoading = 
    jobQuery.isLoading || 
    scheduleQuery.isLoading || 
    timelineQuery.isLoading ||
    (!!workerId && availabilityQuery.isLoading);

  const isError = 
    jobQuery.isError || 
    scheduleQuery.isError || 
    timelineQuery.isError ||
    (!!workerId && availabilityQuery.isError);

  const refresh = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) }),
      queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(jobId) }),
      queryClient.invalidateQueries({ queryKey: timelineKeys.detail(jobId) }),
      workerId ? queryClient.invalidateQueries({ queryKey: availabilityKeys.list(workerId) }) : Promise.resolve(),
    ]);
  }, [queryClient, jobId, workerId]);

  return {
    job,
    assignment,
    schedule,
    timeline,
    availability,
    
    // States
    isLoading,
    isError,
    
    // Individual states if needed
    isJobLoading: jobQuery.isLoading,
    isScheduleLoading: scheduleQuery.isLoading,
    isTimelineLoading: timelineQuery.isLoading,
    isAvailabilityLoading: !!workerId && availabilityQuery.isLoading,

    // Actions
    refresh,
    
    // Error object
    error: jobQuery.error || scheduleQuery.error || timelineQuery.error || availabilityQuery.error,
  };
}
