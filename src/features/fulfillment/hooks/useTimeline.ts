import { useQuery } from '@tanstack/react-query';
import { timelineRepository } from '../repositories/timeline.repository';
import { timelineKeys } from '../api/queryKeys';

export function useTimeline(jobId: string) {
  const query = useQuery({
    queryKey: timelineKeys.detail(jobId),
    queryFn: () => timelineRepository.getTimeline(jobId),
    enabled: !!jobId,
  });

  return {
    timeline: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
