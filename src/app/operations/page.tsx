"use client";

import React, { useEffect, useState, useCallback } from "react";
import { JobApi } from "@/features/fulfillment/api/job.api";
import { Job, JobStatus } from "@/features/fulfillment/types/job.types";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { OperationsMetricsCard, RecentJobsTable } from "@/components/operations";
import { useRouter } from "next/navigation";
import { metricsColors } from "@/lib/status-colors";

const jobApi = new JobApi();

export default function OperationsDashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all jobs to derive metrics
      const res = await jobApi.getJobs({ limit: 100 });
      setJobs(res.data);
    } catch (err) {
      setError("Failed to load operational data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Derive metrics from jobs
  const metrics = {
    pendingMatching: jobs.filter(j => j.status === JobStatus.MATCHING).length,
    pendingAssignment: jobs.filter(j => j.status === JobStatus.WAITING_FOR_WORKERS).length,
    scheduledJobs: jobs.filter(j => j.status === JobStatus.SCHEDULED).length,
    inProgressJobs: jobs.filter(j => j.status === JobStatus.IN_PROGRESS).length,
    completedToday: jobs.filter(j => {
      if (j.status !== JobStatus.COMPLETED) return false;
      const created = new Date(j.createdAt);
      const today = new Date();
      return created.toDateString() === today.toDateString();
    }).length,
    cancelledToday: jobs.filter(j => {
      if (j.status !== JobStatus.CANCELLED) return false;
      const created = new Date(j.createdAt);
      const today = new Date();
      return created.toDateString() === today.toDateString();
    }).length,
  };

  // Get recent jobs (latest 10)
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const handleViewJob = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  if (loading && jobs.length === 0) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-6">
          <div className="h-8 w-48 rounded-lg bg-muted/60 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-24 rounded-xl bg-muted/60 animate-pulse" />
            ))}
          </div>
          <div className="h-64 rounded-xl bg-muted/60 animate-pulse" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={loadDashboard}>
              Retry
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (jobs.length === 0) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Fulfillment Operations</h2>
              <p className="text-muted-foreground">Monitor and manage job operations.</p>
            </div>
            <Button variant="outline" size="sm" onClick={loadDashboard} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh Dashboard
            </Button>
          </div>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">No Data Available</p>
            <p className="text-xs text-muted-foreground mt-1">No operational data is available at the moment.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Fulfillment Operations</h2>
            <p className="text-muted-foreground">Monitor and manage job operations.</p>
          </div>
          <Button variant="outline" size="sm" onClick={loadDashboard} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh Dashboard
          </Button>
        </div>

        {/* Metrics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OperationsMetricsCard
            title="Pending Matching"
            value={metrics.pendingMatching}
            icon={<Users className="w-4 h-4" />}
            color={metricsColors.pendingMatching}
          />
          <OperationsMetricsCard
            title="Pending Assignment"
            value={metrics.pendingAssignment}
            icon={<Users className="w-4 h-4" />}
            color={metricsColors.pendingAssignment}
          />
          <OperationsMetricsCard
            title="Scheduled Jobs"
            value={metrics.scheduledJobs}
            icon={<Calendar className="w-4 h-4" />}
            color={metricsColors.scheduledJobs}
          />
          <OperationsMetricsCard
            title="In Progress Jobs"
            value={metrics.inProgressJobs}
            icon={<Clock className="w-4 h-4" />}
            color={metricsColors.inProgressJobs}
          />
          <OperationsMetricsCard
            title="Completed Today"
            value={metrics.completedToday}
            icon={<CheckCircle className="w-4 h-4" />}
            color={metricsColors.completedToday}
          />
          <OperationsMetricsCard
            title="Cancelled Today"
            value={metrics.cancelledToday}
            icon={<XCircle className="w-4 h-4" />}
            color={metricsColors.cancelledToday}
          />
        </div>

        {/* Recent Jobs Table */}
        <RecentJobsTable jobs={recentJobs} onViewJob={handleViewJob} />
      </div>
    </AppLayout>
  );
}