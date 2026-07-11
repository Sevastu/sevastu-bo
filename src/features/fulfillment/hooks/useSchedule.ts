import { useQuery } from '@tanstack/react-query';
import { scheduleRepository } from '../repositories/schedule.repository';
import { scheduleKeys } from '../api/queryKeys';

export function useSchedule(jobId: string) {
  const query = useQuery({
    queryKey: scheduleKeys.detail(jobId),
    queryFn: () => scheduleRepository.getScheduleByJob(jobId),
    enabled: !!jobId,
  });

  return {
    schedules: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
