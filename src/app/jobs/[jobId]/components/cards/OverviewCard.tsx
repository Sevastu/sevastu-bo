import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Job } from '@/features/fulfillment/types/job.types';
import { formatDate } from '@/lib/date-utils';

interface OverviewCardProps {
  job: Job;
}

export default function OverviewCard({ job }: OverviewCardProps) {
  return (
    <SectionCard title="Overview" description="High-level job details.">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Job ID</p>
          <p className="font-mono text-sm font-medium">{job._id}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Created At</p>
          <p className="text-sm font-medium">{formatDate(new Date(job.createdAt), "dd MMM yyyy, hh:mm a")}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Preferred Schedule</p>
          <p className="text-sm font-medium">{formatDate(new Date(job.preferredSchedule), "dd MMM yyyy, hh:mm a")}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Category</p>
          <p className="text-sm font-medium">{job.categoryId?.name || '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Service</p>
          <p className="text-sm font-medium">{job.serviceId?.name || '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sub Service</p>
          <p className="text-sm font-medium">{job.subServiceIds?.map(s => s.name).join(', ') || '-'}</p>
        </div>
      </div>
    </SectionCard>
  );
}
