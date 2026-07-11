"use client";

import React, { useState } from 'react';
import { 
  useExecutiveAnalytics, 
  useCustomerAnalytics, 
  useServiceAnalytics, 
  useRegionalAnalytics, 
  useTimelineAnalytics, 
  useAutomationAnalytics, 
  useSLAMetrics, 
  useAnomalies, 
  useForecastData 
} from '@/features/analytics/hooks/useAnalytics';
import { AnalyticsFilter } from '@/features/analytics/types/analytics.types';

import dynamic from 'next/dynamic';

// Components
import { KPICards } from './KPICards';

// Dynamic Imports for Heavy Charting Components
const RevenueChart = dynamic(() => import('./charts/RevenueChart').then(mod => mod.RevenueChart), { ssr: false, loading: () => <div className="h-[300px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div> });
const JobChart = dynamic(() => import('./charts/JobChart').then(mod => mod.JobChart), { ssr: false });
const WorkerChart = dynamic(() => import('./charts/WorkerChart').then(mod => mod.WorkerChart), { ssr: false });
const CustomerChart = dynamic(() => import('./charts/CustomerChart').then(mod => mod.CustomerChart), { ssr: false });
const ServiceChart = dynamic(() => import('./charts/ServiceChart').then(mod => mod.ServiceChart), { ssr: false });
const GeoHeatmap = dynamic(() => import('./charts/GeoHeatmap').then(mod => mod.GeoHeatmap), { ssr: false });

// Panels
import { LiveActivity } from './panels/LiveActivity';
import { AlertsPanel } from './panels/AlertsPanel';
import { AnomalyPanel } from './panels/AnomalyPanel';
import { ForecastPanel } from './panels/ForecastPanel';
import { SLAMonitoring } from './panels/SLAMonitoring';
import { ReportsPanel } from './panels/ReportsPanel';

import { Download, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ExecutiveDashboard: React.FC = () => {
  const [filter, setFilter] = useState<AnalyticsFilter>({ dateRange: '30d' });

  // Fetch all analytics data
  const { kpi, revenue, jobs, workforce } = useExecutiveAnalytics(filter);
  const customers = useCustomerAnalytics(filter);
  const services = useServiceAnalytics(filter);
  const regional = useRegionalAnalytics(filter);
  const timeline = useTimelineAnalytics(filter); // Timeline can be passed if a separate chart is built
  const automation = useAutomationAnalytics(filter);
  const sla = useSLAMetrics(filter);
  const anomalies = useAnomalies(filter);
  const forecast = useForecastData(filter);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header and Global Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-2 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Executive Command Center</h1>
          <p className="text-muted-foreground text-sm">Strategic overview and business intelligence</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Global Date Filter */}
          <div className="relative">
            <select
              value={filter.dateRange}
              onChange={(e) => setFilter({ ...filter, dateRange: e.target.value as any })}
              className="pl-4 pr-10 py-2 border border-border bg-card rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
              <option value="1y">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>

          <Button variant="outline" size="sm" className="gap-2" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          
          <Button size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Brief
          </Button>
        </div>
      </div>

      {/* Global KPI Ticker */}
      <section>
        <KPICards data={kpi.data} isLoading={kpi.isLoading} />
      </section>

      {/* Critical & Predictive Top Layer */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnomalyPanel data={anomalies.data} isLoading={anomalies.isLoading} />
        </div>
        <div>
          <AlertsPanel isLoading={anomalies.isLoading} />
        </div>
      </section>

      {/* Primary Analytics Layer */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenue.data} isLoading={revenue.isLoading} />
        <ForecastPanel data={forecast.data} isLoading={forecast.isLoading} />
      </section>

      {/* Operational Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <JobChart data={jobs.data} isLoading={jobs.isLoading} />
        <WorkerChart data={workforce.data} isLoading={workforce.isLoading} />
        <ServiceChart data={services.data} isLoading={services.isLoading} />
      </section>

      {/* Advanced & Regional Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerChart data={customers.data} isLoading={customers.isLoading} />
        <GeoHeatmap data={regional.data} isLoading={regional.isLoading} />
      </section>

      {/* Bottom Management Layer */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LiveActivity data={automation.data} isLoading={automation.isLoading} />
        <SLAMonitoring data={sla.data} isLoading={sla.isLoading} />
        <ReportsPanel />
      </section>

    </div>
  );
};
