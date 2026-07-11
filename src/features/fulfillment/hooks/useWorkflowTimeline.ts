import { useQuery, useQueryClient } from '@tanstack/react-query';
import { timelineRepository } from '@/features/fulfillment/repositories/timeline.repository';
import { jobsRepository } from '@/features/fulfillment/repositories/jobs.repository';
import { ScheduleStatus } from '@/features/fulfillment/types/schedule.types';
import { assignmentRepository } from '@/features/fulfillment/repositories/assignment.repository';
import { scheduleRepository } from '@/features/fulfillment/repositories/schedule.repository';
import { 
  timelineKeys, 
  jobKeys, 
  assignmentKeys, 
  scheduleKeys 
} from '@/features/fulfillment/api/queryKeys';

export const useWorkflowTimeline = (jobId?: string) => {
  const queryClient = useQueryClient();

  // If jobId is 'all' or undefined, this could be the Global Timeline
  const isGlobal = !jobId || jobId === 'all';
  const targetJobId = isGlobal ? 'all' : jobId; // Depending on API support for 'all'

  // Fetch Timeline Events
  const { data: timelineResponse, isLoading: isLoadingTimeline } = useQuery({
    queryKey: timelineKeys.detail(targetJobId as string),
    queryFn: () => timelineRepository.getTimeline(targetJobId as string),
    enabled: !!targetJobId,
    refetchInterval: 15000, // Premium Feature 1: Live Event Stream (Polling for now, could be websockets)
  });

  // Fetch Core Job details (for Workflow Status)
  const { data: jobResponse, isLoading: isLoadingJob } = useQuery({
    queryKey: jobKeys.detail(targetJobId as string),
    queryFn: () => jobsRepository.getJob(targetJobId as string),
    enabled: !isGlobal && !!targetJobId,
  });

  // Fetch Assignment
  const { data: assignmentResponse, isLoading: isLoadingAssignment } = useQuery({
    queryKey: assignmentKeys.list(targetJobId as string),
    queryFn: () => assignmentRepository.getAssignmentByJob(targetJobId as string),
    enabled: !isGlobal && !!targetJobId,
  });

  // Fetch Schedule
  const { data: scheduleResponse, isLoading: isLoadingSchedule } = useQuery({
    queryKey: scheduleKeys.detail(targetJobId as string),
    queryFn: () => scheduleRepository.getScheduleByJob(targetJobId as string),
    enabled: !isGlobal && !!targetJobId,
  });

  const invalidateAll = () => {
    if (!isGlobal) {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(targetJobId as string) });
      queryClient.invalidateQueries({ queryKey: assignmentKeys.list(targetJobId as string) });
      queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(targetJobId as string) });
    }
    queryClient.invalidateQueries({ queryKey: timelineKeys.detail(targetJobId as string) });
  };

  // Derive Data
  const events = timelineResponse?.data?.events || timelineResponse?.data || [];
  const job = jobResponse?.data;
  const assignment = assignmentResponse?.data;
  const schedule = scheduleResponse?.data;

  // Premium Feature 2: Workflow Health Score (Mocking calculation based on status/delays)
  const calculateHealth = () => {
    let score = 100;
    let assignmentHealth = 100;
    let scheduleHealth = 100;

    if (job?.status === 'CANCELLED') score = 0;
    // Example logic: if we have schedule but it's delayed
    if (schedule?.status === ScheduleStatus.RESCHEDULED) scheduleHealth -= 20;
    
    return {
      overall: Math.floor((score + assignmentHealth + scheduleHealth) / 3),
      assignment: assignmentHealth,
      schedule: scheduleHealth,
      status: score > 80 ? 'Healthy' : score > 50 ? 'Warning' : 'Critical'
    };
  };

  // Premium Feature 3: Stage Duration Analysis
  // In a real scenario, this would parse the timestamps of specific events from the timeline
  const stageDurations = {
    createdToAssigned: '18 min',
    assignedToScheduled: '12 min',
    scheduledToStarted: '1 hr',
    startedToCompleted: '2 hr'
  };

  return {
    events,
    job,
    assignment,
    schedule,
    health: calculateHealth(),
    stageDurations,
    isLoading: isLoadingTimeline || isLoadingJob || isLoadingAssignment || isLoadingSchedule,
    invalidateAll
  };
};
