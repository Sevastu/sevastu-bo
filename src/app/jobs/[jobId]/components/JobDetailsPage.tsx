import React from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import PageHeader from '@/components/common/PageHeader';
import { StateViews } from '@/components/common/StateViews';
import { Briefcase } from 'lucide-react';
import { useJobDetails } from '@/features/fulfillment/hooks/useJobDetails';
import { JobStatus } from '@/features/fulfillment/types/job.types';
import { jobStatusColors } from '@/lib/status-colors';
import WorkflowProgress from './WorkflowProgress';
import QuickActionPanel from './panels/QuickActionPanel';
import OverviewCard from './cards/OverviewCard';
import CustomerCard from '../components/cards/CustomerCard';
import WorkerCard from '../components/cards/WorkerCard';
import AssignmentCard from '../components/cards/AssignmentCard';
import ScheduleCard from '../components/cards/ScheduleCard';
import TimelineCard from '../components/cards/TimelineCard';
import AvailabilityCard from '../components/cards/AvailabilityCard';
import ActivityCard from '../components/cards/ActivityCard';
import StatusCard from '../components/cards/StatusCard';
import { RecommendationPanel } from '@/components/jobs/recommendations/RecommendationPanel';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

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

  return (
    <AppLayout>
      <div className="space-y-6 flex flex-col h-full animate-in fade-in slide-in-from-top-4 duration-500">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/jobs">Jobs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{job?._id?.slice(-8) || jobId.slice(-8)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PageHeader 
          title="Job Operations Workspace" 
          description="Monitor and manage job fulfillment lifecycle."
          actions={job && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${jobStatusColors[job.status as JobStatus]}`}>
              {job.status?.replace('_', ' ')}
            </span>
          )}
        />

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
              <QuickActionPanel job={job} assignment={assignment} schedule={schedule} onRefresh={refresh} />
              
              <WorkflowProgress job={job} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 70% */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <OverviewCard job={job} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <CustomerCard customer={job.customerId} address={job.address} />
                    <WorkerCard assignment={assignment} />
                  </div>
                  <div id="recommendations-section">
                    <RecommendationPanel jobId={job._id || jobId} />
                  </div>
                  <AssignmentCard assignment={assignment} />
                  <ScheduleCard schedule={schedule} />
                  <TimelineCard timeline={timeline} />
                </div>

                {/* Right 30% */}
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <StatusCard job={job} schedule={schedule} />
                  <AvailabilityCard availability={availability} workerId={assignment?.workerId} />
                  <ActivityCard timeline={timeline} />
                </div>
              </div>
            </div>
          )}
        </StateViews>
      </div>
    </AppLayout>
  );
}
