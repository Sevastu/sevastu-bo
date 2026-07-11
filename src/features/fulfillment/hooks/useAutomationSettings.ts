import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowRepository } from '@/features/fulfillment/repositories/workflow.repository';
import { toast } from 'sonner';

// Custom Query Keys for Automation (Global)
export const automationKeys = {
  all: ['automation-policies'] as const,
  lists: () => [...automationKeys.all, 'list'] as const,
  type: (type: string) => [...automationKeys.lists(), type] as const,
};

// 1. Core Workflow Policies Hook
export const useWorkflowPolicies = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: automationKeys.lists(),
    queryFn: () => workflowRepository.getAllPolicies(),
  });

  const createPolicy = useMutation({
    mutationFn: (payload: any) => workflowRepository.createPolicy(payload),
    onSuccess: () => {
      toast.success('Policy created successfully');
      queryClient.invalidateQueries({ queryKey: automationKeys.all });
    },
    onError: (err: any) => toast.error(err?.message || 'Failed to create policy')
  });

  const updatePolicy = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => workflowRepository.updatePolicy(id, payload),
    onSuccess: () => {
      toast.success('Policy updated successfully');
      queryClient.invalidateQueries({ queryKey: automationKeys.all });
    },
    onError: (err: any) => toast.error(err?.message || 'Failed to update policy')
  });

  const deletePolicy = useMutation({
    mutationFn: (id: string) => workflowRepository.deletePolicy(id),
    onSuccess: () => {
      toast.success('Policy deleted successfully');
      queryClient.invalidateQueries({ queryKey: automationKeys.all });
    },
    onError: (err: any) => toast.error(err?.message || 'Failed to delete policy')
  });

  return {
    policies: data?.data || [],
    isLoading,
    createPolicy,
    updatePolicy,
    deletePolicy
  };
};

// 2. Specific Rule Wrapper (Assignment, Schedule, etc.)
export const useAutomationRules = (type: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: automationKeys.type(type),
    queryFn: () => workflowRepository.getPoliciesByType(type),
  });

  return {
    rules: data?.data || [],
    isLoading
  };
};

// 3. Holiday Calendar Wrapper
export const useHolidayCalendar = () => {
  return useAutomationRules('HOLIDAY');
};

// 4. Business Hours Wrapper
export const useBusinessHours = () => {
  return useAutomationRules('BUSINESS_HOURS');
};
