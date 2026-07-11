import { useQuery } from '@tanstack/react-query';
import { AnalyticsApi } from '../api/analytics.api';
import { AnalyticsFilter } from '../types/analytics.types';

export const analyticsKeys = {
  all: ['analytics'] as const,
  kpis: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'kpis', filter] as const,
  revenue: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'revenue', filter] as const,
  jobs: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'jobs', filter] as const,
  workforce: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'workforce', filter] as const,
  customers: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'customers', filter] as const,
  services: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'services', filter] as const,
  regional: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'regional', filter] as const,
  timeline: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'timeline', filter] as const,
  automation: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'automation', filter] as const,
  sla: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'sla', filter] as const,
  anomalies: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'anomalies', filter] as const,
  forecast: (filter: AnalyticsFilter) => [...analyticsKeys.all, 'forecast', filter] as const,
};

export const useGlobalKPIs = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.kpis(filter),
    queryFn: () => AnalyticsApi.getGlobalKPIs(filter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRevenueAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.revenue(filter),
    queryFn: () => AnalyticsApi.getRevenueAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useJobAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.jobs(filter),
    queryFn: () => AnalyticsApi.getJobAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useWorkforceAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.workforce(filter),
    queryFn: () => AnalyticsApi.getWorkforceAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCustomerAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.customers(filter),
    queryFn: () => AnalyticsApi.getCustomerAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useServiceAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.services(filter),
    queryFn: () => AnalyticsApi.getServiceAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useRegionalAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.regional(filter),
    queryFn: () => AnalyticsApi.getRegionalAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTimelineAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.timeline(filter),
    queryFn: () => AnalyticsApi.getTimelineAnalytics(filter),
    staleTime: 1 * 60 * 1000, // 1 minute for timeline
  });
};

export const useAutomationAnalytics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.automation(filter),
    queryFn: () => AnalyticsApi.getAutomationAnalytics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSLAMetrics = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.sla(filter),
    queryFn: () => AnalyticsApi.getSLAMetrics(filter),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAnomalies = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.anomalies(filter),
    queryFn: () => AnalyticsApi.getAnomalies(filter),
    refetchInterval: 30000, // Real-timeish polling every 30s
  });
};

export const useForecastData = (filter: AnalyticsFilter) => {
  return useQuery({
    queryKey: analyticsKeys.forecast(filter),
    queryFn: () => AnalyticsApi.getForecast(filter),
    staleTime: 60 * 60 * 1000, // 1 hour (forecast doesn't change often)
  });
};

export const useExecutiveAnalytics = (filter: AnalyticsFilter) => {
  // Convenience hook to fetch all critical executive data in parallel
  // This could also be a separate API call on backend to aggregate everything, 
  // but here we just combine them using useQueries if we needed to, or let the dashboard call what it needs.
  return {
    kpi: useGlobalKPIs(filter),
    revenue: useRevenueAnalytics(filter),
    jobs: useJobAnalytics(filter),
    workforce: useWorkforceAnalytics(filter),
  };
};
