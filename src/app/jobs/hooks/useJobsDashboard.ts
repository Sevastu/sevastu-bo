import { useState, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { jobKeys } from '@/features/fulfillment/api/queryKeys';
import { jobsRepository } from '@/features/fulfillment/repositories/jobs.repository';
import { Job } from '@/features/fulfillment/types/job.types';
import { ViewMode } from '@/components/common/ViewToggle';

export interface JobsDashboardFilters {
  search: string;
  status?: string;
  category?: string;
  service?: string;
  subService?: string;
  startDate?: string;
  endDate?: string;
}

export function useJobsDashboard() {
  const queryClient = useQueryClient();

  // Local UI State
  const [view, setView] = useState<ViewMode>('table');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<JobsDashboardFilters>({ search: '' });

  // Compute final params for API request
  const queryParams = useMemo(() => {
    const params: Record<string, any> = { page, limit };
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.category) params.categoryId = filters.category;
    if (filters.service) params.serviceId = filters.service;
    if (filters.subService) params.subServiceId = filters.subService;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    return params;
  }, [page, limit, filters]);

  // Fetch Jobs Data
  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: jobKeys.list(queryParams),
    queryFn: () => jobsRepository.getJobs(queryParams),
  });

  // Extract jobs and pagination cleanly based on the generic ApiResponse structure
  const jobs: Job[] = useMemo(() => {
    if (!data) return [];

    const response = data as any;
    if (Array.isArray(response)) return response;
    if (response.data && Array.isArray(response.data)) return response.data;
    if (response.items && Array.isArray(response.items)) return response.items;
    return [];
  }, [data]);

  const total = useMemo(() => {
    if (!data) return 0;

    const response = data as any;
    if (response.pagination?.total !== undefined) return response.pagination.total;
    if (response.meta?.total !== undefined) return response.meta.total;
    if (response.total !== undefined) return response.total;
    return Array.isArray(response) ? response.length : 0;
  }, [data]);

  // Fetch Analytics
  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
  } = useQuery({
    queryKey: [...jobKeys.all, "stats"],
    queryFn: () => jobsRepository.getJobStats(),
  });

  // Actions
  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setPage(1); // Reset page on search
  }, []);

  const handleFilterChange = useCallback((key: keyof JobsDashboardFilters, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: jobKeys.all });
  }, [queryClient]);

  return {
    jobs,
    total,
    analytics,
    page,
    limit,
    filters,
    view,
    isLoading,
    isFetching,
    isError,
    error,
    isAnalyticsLoading,
    setPage,
    setLimit,
    setView,
    setFilters,
    handleSearch,
    handleFilterChange,
    refresh,
    refetch,
  };
}
