"use client";

import React, { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { JobApi } from "@/features/fulfillment/api/job.api";
import { Job, JobStatus } from "@/features/fulfillment/types/job.types";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Briefcase, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";
import { useRouter } from "next/navigation";
import { jobStatusColors } from "@/lib/status-colors";

// Lazy load components for performance
const JobTimelinePanel = lazy(() => import("@/components/jobs/timeline/JobTimelinePanel").then(mod => ({ default: mod.JobTimelinePanel })));
const RecommendationPanel = lazy(() => import("@/components/jobs/recommendations/RecommendationPanel").then(mod => ({ default: mod.RecommendationPanel })));
const AssignmentPanel = lazy(() => import("@/components/jobs/assignment/AssignmentPanel").then(mod => ({ default: mod.AssignmentPanel })));
const SchedulePanel = lazy(() => import("@/components/jobs/schedule/SchedulePanel").then(mod => ({ default: mod.SchedulePanel })));
const WorkflowProgress = lazy(() => import("@/components/jobs/workflow/WorkflowProgress").then(mod => ({ default: mod.WorkflowProgress })));

const jobApi = new JobApi();

interface JobDetailPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  // Unwrap params Promise (Next.js 16 requirement)
  const resolvedParams = React.use(params);
  const jobId = resolvedParams.jobId;
  
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'recommendations' | 'assignment' | 'schedule'>('timeline');

  const loadJob = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.getJob(jobId);
      setJob(data);
    } catch (err) {
      setError("Failed to load job details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadJob();
  }, [loadJob]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-muted/60 animate-pulse" />
            <div className="h-8 w-48 rounded-lg bg-muted/60 animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-32 rounded-xl bg-muted/60 animate-pulse" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={loadJob}>
              Retry
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!job) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">Job Not Found</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Defensive: ensure status exists, default to CREATED
  const jobStatus = job.status || JobStatus.CREATED;

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Job Details</h2>
              <p className="text-muted-foreground">Job ID: {job.id?.slice(-8) || '-'}</p>
            </div>
          </div>
          <Badge className={cn("px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px] border shadow-none", jobStatusColors[jobStatus])}>
            {jobStatus.replace('_', ' ')}
          </Badge>
        </div>

        {/* Section 1: Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Job ID</p>
              <p className="font-mono text-sm font-bold mt-1">{job.id?.slice(-8) || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Status</p>
              <Badge className={cn("px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none mt-1", jobStatusColors[jobStatus])}>
                {jobStatus.replace('_', ' ')}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Created At</p>
              <p className="text-sm font-medium mt-1">{formatDate(new Date(job.createdAt), "dd MMM, hh:mm a")}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Updated At</p>
              <p className="text-sm font-medium mt-1">{formatDate(new Date(job.updatedAt), "dd MMM, hh:mm a")}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Customer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="w-4 h-4" /> Customer
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Customer Name</p>
              <p className="text-sm font-medium mt-1">{job.customerName || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Phone</p>
              <p className="text-sm font-medium mt-1">{job.customerPhone || '-'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Address</p>
              <p className="text-sm font-medium mt-1">{job.address || '-'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Location</p>
              <p className="text-sm font-medium mt-1">
                {job.coordinates && job.coordinates.length >= 2
                  ? `${job.coordinates[1]}, ${job.coordinates[0]}`
                  : '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Service */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Service
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Category</p>
              <p className="text-sm font-medium mt-1">{job.categoryName || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Service</p>
              <p className="text-sm font-medium mt-1">{job.serviceName || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Sub Service</p>
              <p className="text-sm font-medium mt-1">{job.subServiceName || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Description</p>
              <p className="text-sm font-medium mt-1">{job.serviceDescription || '-'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Current Assignment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="w-4 h-4" /> Current Assignment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Assigned Worker</p>
              <p className="text-sm font-medium mt-1">{job.assignedWorkerName || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Assignment Status</p>
              <p className="text-sm font-medium mt-1">{job.assignmentStatus || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Assigned Time</p>
              <p className="text-sm font-medium mt-1">
                {job.assignedAt ? formatDate(new Date(job.assignedAt), "dd MMM, hh:mm a") : '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Schedule Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Schedule Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Preferred Schedule</p>
              <p className="text-sm font-medium mt-1">
                {formatDate(new Date(job.preferredSchedule), "dd MMM, hh:mm a")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Confirmed Schedule</p>
              <p className="text-sm font-medium mt-1">
                {job.confirmedSchedule ? formatDate(new Date(job.confirmedSchedule), "dd MMM, hh:mm a") : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Estimated Duration</p>
              <p className="text-sm font-medium mt-1">
                {job.estimatedDuration ? `${job.estimatedDuration} minutes` : '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Workflow Progress */}
        <Suspense fallback={
          <div className="h-64 rounded-xl bg-muted/60 animate-pulse" />
        }>
          <WorkflowProgress job={job} />
        </Suspense>

        {/* Section 7: Timeline, Recommendations, Assignment, and Schedule Tabs */}
        <div className="space-y-4">
          <div className="flex gap-2 border-b border-border" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'timeline'}
              onClick={() => setActiveTab('timeline')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'timeline'
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Timeline
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'recommendations'}
              onClick={() => setActiveTab('recommendations')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'recommendations'
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Recommendations
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'assignment'}
              onClick={() => setActiveTab('assignment')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'assignment'
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Assignment
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'schedule'}
              onClick={() => setActiveTab('schedule')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'schedule'
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Schedule
            </button>
          </div>
          
          <Suspense fallback={
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 rounded-xl bg-muted/60 animate-pulse" />
              ))}
            </div>
          }>
            {activeTab === 'timeline' ? (
              <JobTimelinePanel jobId={job.id} />
            ) : activeTab === 'recommendations' ? (
              <RecommendationPanel jobId={job.id} />
            ) : activeTab === 'assignment' ? (
              <AssignmentPanel job={job} />
            ) : (
              <SchedulePanel job={job} />
            )}
          </Suspense>
        </div>
      </div>
    </AppLayout>
  );
}