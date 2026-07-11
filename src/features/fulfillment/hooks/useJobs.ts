import { useQuery } from '@tanstack/react-query';
import { jobsRepository } from '../repositories/jobs.repository';
import { jobKeys } from '../api/queryKeys';

export interface JobFilters {
  status?: string;
  categoryId?: string;
  serviceId?: string;
  customerId?: string;
  workerId?: string;
  startDate?: string;
  endDate?: string;
}

export function useJobs(filters: JobFilters = {}, page = 1, limit = 10) {
  const queryParams = { ...filters, page, limit };

  const query = useQuery({
    queryKey: jobKeys.list(queryParams),
    queryFn: () => jobsRepository.getJobs(queryParams),
  });

  return {
    jobs: query.data?.data || [],
    pagination: query.data?.pagination || { page, limit, total: 0 },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}