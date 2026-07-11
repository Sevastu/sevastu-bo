import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleRepository } from '@/features/fulfillment/repositories/schedule.repository';
import { availabilityRepository } from '@/features/fulfillment/repositories/availability.repository';
import { timelineRepository } from '@/features/fulfillment/repositories/timeline.repository';
import { assignmentRepository } from '@/features/fulfillment/repositories/assignment.repository';
import { jobsRepository } from '@/features/fulfillment/repositories/jobs.repository';
import { 
  scheduleKeys, 
  availabilityKeys, 
  timelineKeys, 
  assignmentKeys, 
  jobKeys 
} from '@/features/fulfillment/api/queryKeys';
import { toast } from 'sonner';

export const useScheduleDetails = (jobId: string, workerId?: string) => {
  const queryClient = useQueryClient();

  // Queries
  const { data: jobResponse, isLoading: isLoadingJob } = useQuery({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => jobsRepository.getJob(jobId),
    enabled: !!jobId,
  });

  const { data: scheduleResponse, isLoading: isLoadingSchedule } = useQuery({
    queryKey: scheduleKeys.detail(jobId),
    queryFn: () => scheduleRepository.getScheduleByJob(jobId),
    enabled: !!jobId,
  });

  const { data: assignmentResponse, isLoading: isLoadingAssignment } = useQuery({
    queryKey: assignmentKeys.list(jobId),
    queryFn: () => assignmentRepository.getAssignmentByJob(jobId),
    enabled: !!jobId,
  });

  const { data: timelineResponse, isLoading: isLoadingTimeline } = useQuery({
    queryKey: timelineKeys.detail(jobId),
    queryFn: () => timelineRepository.getTimeline(jobId),
    enabled: !!jobId,
  });

  const { data: availabilityResponse, isLoading: isLoadingAvailability } = useQuery({
    queryKey: availabilityKeys.list(workerId || ''),
    queryFn: () => availabilityRepository.getAvailability(workerId || ''),
    enabled: !!workerId,
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(jobId) });
    queryClient.invalidateQueries({ queryKey: timelineKeys.detail(jobId) });
    queryClient.invalidateQueries({ queryKey: assignmentKeys.list(jobId) });
    queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    if (workerId) {
      queryClient.invalidateQueries({ queryKey: availabilityKeys.list(workerId) });
    }
  };

  // Mutations
  const createSchedule = useMutation({
    mutationFn: (payload: { workerId: string; scheduledStart: Date; scheduledEnd: Date }) => 
      scheduleRepository.createSchedule(jobId, payload),
    onSuccess: () => {
      toast.success('Schedule created successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create schedule');
    }
  });

  const reschedule = useMutation({
    mutationFn: (payload: { scheduleId: string; scheduledStart: Date; scheduledEnd: Date }) => 
      scheduleRepository.reschedule(payload.scheduleId, { scheduledStart: payload.scheduledStart, scheduledEnd: payload.scheduledEnd }),
    onSuccess: () => {
      toast.success('Rescheduled successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to reschedule');
    }
  });

  const confirmSchedule = useMutation({
    mutationFn: (scheduleId: string) => scheduleRepository.confirmSchedule(scheduleId),
    onSuccess: () => {
      toast.success('Schedule confirmed');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to confirm schedule');
    }
  });

  const cancelSchedule = useMutation({
    mutationFn: (scheduleId: string) => scheduleRepository.cancelSchedule(scheduleId),
    onSuccess: () => {
      toast.success('Schedule cancelled');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to cancel schedule');
    }
  });

  const replaceWorker = useMutation({
    mutationFn: (payload: { scheduleId: string; replacementWorkerId: string }) => 
      scheduleRepository.setReplacementWorker(payload.scheduleId, { replacementWorkerId: payload.replacementWorkerId }),
    onSuccess: () => {
      toast.success('Worker replaced successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to replace worker');
    }
  });

  return {
    // Data
    job: jobResponse?.data,
    schedule: scheduleResponse?.data,
    assignment: assignmentResponse?.data,
    timeline: timelineResponse?.data,
    availability: availabilityResponse?.data,
    
    // Loading States
    isLoading: isLoadingJob || isLoadingSchedule || isLoadingAssignment || isLoadingTimeline,
    isLoadingJob,
    isLoadingSchedule,
    isLoadingAssignment,
    isLoadingTimeline,
    isLoadingAvailability,
    
    // Mutations
    createSchedule,
    reschedule,
    confirmSchedule,
    cancelSchedule,
    replaceWorker,
  };
};
