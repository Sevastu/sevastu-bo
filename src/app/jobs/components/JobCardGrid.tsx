import React from 'react';
import { Job } from '@/features/fulfillment/types/job.types';
import StatusBadge from '@/components/common/StatusBadge';
import { jobStatusColors } from '@/lib/status-colors';
import JobActionMenu from './JobActionMenu';
import { format } from 'date-fns';
import { MapPin, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface JobCardGridProps {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function JobCardGrid({
  jobs,
  total,
  page,
  limit,
  onPageChange,
  isLoading,
}: JobCardGridProps) {
  const totalPages = Math.ceil(total / limit) || 1;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card border rounded-lg p-5 h-48 animate-pulse flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
            <div className="h-8 bg-muted rounded w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border">
        <p className="text-muted-foreground font-medium">No results found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, idx) => (
          <div key={job._id || idx} className="bg-card border rounded-xl p-5 hover:shadow-sm transition-shadow group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-muted-foreground">#{job._id?.slice(-6).toUpperCase() || 'N/A'}</span>
                <StatusBadge label={job.status} className={jobStatusColors[job.status as keyof typeof jobStatusColors]} />
              </div>
              
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                {job.serviceId?.name || 'Unknown Service'}
              </h3>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-2 opacity-70" />
                  <span className="truncate">{job.customerId?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 opacity-70" />
                  <span className="truncate">{job.address || 'No address'}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 opacity-70" />
                  <span>{job.preferredSchedule ? format(new Date(job.preferredSchedule), 'MMM d, HH:mm') : 'Unscheduled'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t flex items-center justify-between">
              <div className="text-xs">
                <span className="text-muted-foreground mr-1">Worker:</span>
                <span className="font-medium">{job.currentAssignmentId?.workerId?.name || 'Unassigned'}</span>
              </div>
              <JobActionMenu job={job} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-card flex items-center justify-between border rounded-lg">
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
                Page <span className="text-foreground">{page}</span> of <span className="text-foreground">{totalPages}</span>
            </span>
            <span className="text-xs text-muted-foreground/80 px-2 py-0.5 bg-primary/10 rounded-full">
                {total} total records
            </span>
        </div>
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="h-9 px-3"
            >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="h-9 px-3"
            >
                Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </div>
      </div>
    </div>
  );
}