import { useQuery } from '@tanstack/react-query';
import { jobsRepository } from '../repositories/jobs.repository';
import { jobKeys } from '../api/queryKeys';

export function useJob(jobId: string) {
  const query = useQuery({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => jobsRepository.getJob(jobId),
    enabled: !!jobId,
  });

  return {
    job: query.data?.data || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
