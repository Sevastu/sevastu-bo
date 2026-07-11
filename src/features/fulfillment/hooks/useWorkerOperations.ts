import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { availabilityRepository } from '@/features/fulfillment/repositories/availability.repository';
import { jobsRepository } from '@/features/fulfillment/repositories/jobs.repository';
import { 
  availabilityKeys, 
  jobKeys,
  timelineKeys,
  assignmentKeys,
  scheduleKeys
} from '@/features/fulfillment/api/queryKeys';
import { toast } from 'sonner';

export const useWorkerOperations = (workerId: string) => {
  const queryClient = useQueryClient();

  // Primary Fetch: Worker Availability (Includes core status, leave, blocked slots, working hours)
  const { data: availabilityResponse, isLoading: isLoadingAvailability } = useQuery({
    queryKey: availabilityKeys.list(workerId),
    queryFn: () => availabilityRepository.getAvailability(workerId),
    enabled: !!workerId,
  });

  // Fetch Jobs assigned to this worker (to extract assignments & schedules)
  const { data: jobsResponse, isLoading: isLoadingJobs } = useQuery({
    queryKey: jobKeys.list({ workerId }),
    queryFn: () => jobsRepository.getJobs({ workerId }),
    enabled: !!workerId,
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: availabilityKeys.list(workerId) });
    queryClient.invalidateQueries({ queryKey: jobKeys.list({ workerId }) });
    queryClient.invalidateQueries({ queryKey: timelineKeys.all });
    queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
  };

  // Mutations for Quick Actions
  const updateWorkingHours = useMutation({
    mutationFn: (payload: { start: Date; end: Date; isRecurring?: boolean; recurringDays?: string[] }) => 
      availabilityRepository.setWorkingHours(workerId, payload),
    onSuccess: () => {
      toast.success('Working hours updated successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update working hours');
    }
  });

  const blockSlot = useMutation({
    mutationFn: (payload: { start: Date; end: Date; reason?: string }) => 
      availabilityRepository.blockSlot(workerId, payload),
    onSuccess: () => {
      toast.success('Slot blocked successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to block slot');
    }
  });

  const removeBlock = useMutation({
    mutationFn: (blockId: string) => 
      availabilityRepository.deleteAvailability(blockId),
    onSuccess: () => {
      toast.success('Block removed successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to remove block');
    }
  });

  const approveLeave = useMutation({
    mutationFn: (payload: { start: Date; end: Date; reason?: string }) => 
      availabilityRepository.setLeave(workerId, payload),
    onSuccess: () => {
      toast.success('Leave approved successfully');
      invalidateAll();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to approve leave');
    }
  });

  // Extract Mock Data based on expected backend response structure 
  // (In a real app, this maps directly to the API response shapes)
  const workerData = availabilityResponse?.data || {};
  const jobsData = jobsResponse?.data?.items || [];

  return {
    // Data
    workerData,
    jobsData,
    
    // Loading States
    isLoading: isLoadingAvailability || isLoadingJobs,
    isLoadingAvailability,
    isLoadingJobs,
    
    // Mutations
    updateWorkingHours,
    blockSlot,
    removeBlock,
    approveLeave,
  };
};
