import React, { useRef } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import PageHeader from '@/components/common/PageHeader';
import { StateViews } from '@/components/common/StateViews';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useJobDetails } from '@/features/fulfillment/hooks/useJobDetails';
import { JobStatus } from '@/features/fulfillment/types/job.types';
import { jobStatusColors } from '@/lib/status-colors';
import WorkflowProgress from './WorkflowProgress';
import QuickActionPanel from './panels/QuickActionPanel';
import OverviewCard from './cards/OverviewCard';
import CustomerCard from './cards/CustomerCard';
import WorkerCard from './cards/WorkerCard';
import AssignmentCard from './cards/AssignmentCard';
import ScheduleCard from './cards/ScheduleCard';
import TimelineCard from './cards/TimelineCard';
import AvailabilityCard from './cards/AvailabilityCard';
import ActivityCard from './cards/ActivityCard';
import StatusCard from './cards/StatusCard';
import { JobAssignmentPanel } from '../../components/JobAssignmentPanel';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface JobDetailsPageProps {
  jobId: string;
}

export default function JobDetailsPage({ jobId }: JobDetailsPageProps) {
  const {
    job,
    assignment,
    schedule,
    timeline,
    availability,
    isLoading,
    isError,
    error,
    refresh,
  } = useJobDetails(jobId);

  const assignmentPanelRef = useRef<HTMLDivElement>(null);

  const handleAssignWorker = () => {
    // Scroll to the assignment panel
    assignmentPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCreateSchedule = () => {
    // Navigate to schedule creation or open schedule modal
    // For now, just refresh
    refresh();
  };

  const handleReplaceWorker = () => {
    // Scroll to assignment panel for reassignment
    assignmentPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCancelJob = () => {
    // Implement job cancellation logic
    const reason = prompt("Reason for cancellation:");
    if (reason) {
      // Call cancel job API
      refresh();
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 flex flex-col h-full animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Enhanced Breadcrumb with Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-muted">
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Breadcrumb className="flex-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/jobs">Jobs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-mono text-xs">{job?._id?.slice(-8) || jobId.slice(-8)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Enhanced Page Header with Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <PageHeader 
              title="Job Operations Workspace" 
              description="Monitor and manage job fulfillment lifecycle."
            />
          </div>
          {job && (
            <div className={cn(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm whitespace-nowrap",
              jobStatusColors[job.status as JobStatus]
            )}>
              {job.status?.replace('_', ' ')}
            </div>
          )}
        </div>

        <StateViews
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={!isLoading && !isError && !job}
          onRetry={refresh}
          emptyConfig={{
            icon: Briefcase,
            title: 'Job Not Found',
            description: 'The requested job does not exist or has been removed.',
          }}
        >
          {job && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Quick Action Panel - Enhanced Styling */}
              <QuickActionPanel 
                job={job} 
                assignment={assignment} 
                schedule={schedule} 
                onRefresh={refresh}
                onAssignWorker={handleAssignWorker}
                onCreateSchedule={handleCreateSchedule}
                onReplaceWorker={handleReplaceWorker}
                onCancelJob={handleCancelJob}
              />
              
              {/* Workflow Progress - Enhanced Visuals */}
              <WorkflowProgress job={job} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column - Primary Content */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <OverviewCard job={job} />
                  
                  {/* Contact Cards Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <CustomerCard customer={job.customerId} address={job.address} />
                    <WorkerCard assignment={assignment} />
                  </div>
                  
                  {/* Worker Assignment Panel - Shows when job needs worker assignment or replacement */}
                  {(job.status === JobStatus.MATCHING || job.status === JobStatus.WAITING_FOR_WORKERS || job.status === JobStatus.CREATED || job.status === JobStatus.ASSIGNED || job.status === JobStatus.SCHEDULED) && (
                    <div ref={assignmentPanelRef}>
                      <JobAssignmentPanel 
                        jobId={job._id}
                        currentWorkerId={assignment?.workerId?._id}
                        jobStatus={job.status}
                        onAssigned={refresh}
                      />
                    </div>
                  )}
                  
                  <AssignmentCard assignment={assignment} />
                  <ScheduleCard schedule={schedule} />
                  <TimelineCard timeline={timeline} />
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <div className="sticky top-6 space-y-5">
                    <StatusCard job={job} schedule={schedule} />
                    <AvailabilityCard availability={availability} workerId={assignment?.workerId} />
                    <ActivityCard timeline={timeline} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </StateViews>
      </div>
    </AppLayout>
  );
}
