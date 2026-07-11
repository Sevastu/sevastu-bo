import React, { useMemo } from 'react';
import { DataTable } from '@/components/DataTable';
import { Job } from '@/features/fulfillment/types/job.types';
import StatusBadge from '@/components/common/StatusBadge';
import { jobStatusColors } from '@/lib/status-colors';
import JobActionMenu from './JobActionMenu';
import { format } from 'date-fns';

interface JobTableProps {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function JobTable({
  jobs,
  total,
  page,
  limit,
  onPageChange,
  isLoading,
}: JobTableProps) {
  const columns = useMemo(() => [
    {
      key: 'id' as keyof Job,
      label: 'Job ID',
      render: (job: Job) => (
        <span className="font-mono text-xs">{job._id?.slice(-6).toUpperCase() || 'N/A'}</span>
      ),
    },
    {
      key: 'customer' as keyof Job,
      label: 'Customer',
      render: (job: Job) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{job.customerId?.name || 'N/A'}</span>
          <span className="text-xs text-muted-foreground">{job.customerId?.phone || 'No phone'}</span>
        </div>
      ),
    },
    {
      key: 'assignment' as keyof Job,
      label: 'Worker',
      render: (job: Job) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{job.currentAssignmentId?.workerId?.name || 'Unassigned'}</span>
        </div>
      ),
    },
    {
      key: 'serviceId' as keyof Job,
      label: 'Service',
      render: (job: Job) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {job.serviceId?.name ?? "N/A"}
          </span>

          <span className="text-xs text-muted-foreground line-clamp-2">
            {job.subServiceIds
              ?.map((s) => s.name)
              .join(", ") || "No Sub Services"}
          </span>
        </div>
      ),
    },
    {
      key: 'preferredSchedule' as keyof Job,
      label: 'Schedule',
      render: (job: Job) => (
        <span className="text-sm">
          {job.preferredSchedule ? format(new Date(job.preferredSchedule), 'MMM d, yyyy HH:mm') : 'N/A'}
        </span>
      ),
    },
    {
      key: 'status' as keyof Job,
      label: 'Status',
      render: (job: Job) => (
        <StatusBadge label={job.status} className={jobStatusColors[job.status as keyof typeof jobStatusColors]} />
      ),
    },
    {
      key: 'actions' as any,
      label: '',
      render: (job: Job) => (
        <div className="flex justify-end">
          <JobActionMenu job={job} />
        </div>
      ),
    },
  ], []);

  return (
    <DataTable
      data={jobs}
      columns={columns}
      total={total}
      page={page}
      limit={limit}
      onPageChange={onPageChange}
      onSearch={() => { }} // Search is handled in toolbar
      isLoading={isLoading}
    />
  );
}