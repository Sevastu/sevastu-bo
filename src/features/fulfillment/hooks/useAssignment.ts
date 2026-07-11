import { useQuery } from '@tanstack/react-query';
import { assignmentRepository } from '../repositories/assignment.repository';
import { assignmentKeys } from '../api/queryKeys';

export function useAssignment(jobId: string) {
  const query = useQuery({
    queryKey: assignmentKeys.list(jobId),
    queryFn: () => assignmentRepository.getAssignmentByJob(jobId),
    enabled: !!jobId,
  });

  return {
    assignments: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
