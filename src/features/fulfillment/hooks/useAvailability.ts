import { useQuery } from '@tanstack/react-query';
import { availabilityRepository } from '../repositories/availability.repository';
import { availabilityKeys } from '../api/queryKeys';

export function useAvailability(workerId: string, params?: Record<string, any>) {
  const query = useQuery({
    queryKey: availabilityKeys.list(workerId, params),
    queryFn: () => availabilityRepository.getAvailability(workerId, params),
    enabled: !!workerId,
  });

  return {
    availability: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
