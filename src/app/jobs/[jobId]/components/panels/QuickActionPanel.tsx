import React from 'react';
import { Job, JobStatus } from '@/features/fulfillment/types/job.types';
import { Assignment } from '@/features/fulfillment/types/assignment.types';
import { Schedule } from '@/features/fulfillment/types/schedule.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, UserPlus, XCircle, RefreshCw, Archive, UserCog, CalendarClock } from 'lucide-react';

interface QuickActionPanelProps {
  job: Job;
  assignment: Assignment | null;
  schedule: Schedule | null;
  onRefresh: () => void;
}

export default function QuickActionPanel({ job, assignment, schedule, onRefresh }: QuickActionPanelProps) {
  // Action logic is based on job.status
  return (
    <Card className="p-4 flex flex-wrap gap-3 items-center justify-between bg-muted/30 border-dashed">
      <div className="flex flex-wrap gap-2">
        {job.status === JobStatus.CREATED && (
          <Button size="sm"><Play className="w-4 h-4 mr-2" /> Start Matching</Button>
        )}
        
        {(job.status === JobStatus.WAITING_FOR_WORKERS || job.status === JobStatus.MATCHING) && (
          <Button size="sm"><UserPlus className="w-4 h-4 mr-2" /> Assign Worker Manually</Button>
        )}

        {job.status === JobStatus.ASSIGNED && !schedule && (
          <Button size="sm"><CalendarClock className="w-4 h-4 mr-2" /> Create Schedule</Button>
        )}

        {job.status === JobStatus.SCHEDULED && (
          <Button size="sm" variant="outline"><UserCog className="w-4 h-4 mr-2" /> Replace Worker</Button>
        )}

        {job.status === JobStatus.COMPLETED && (
          <Button size="sm" variant="secondary"><Archive className="w-4 h-4 mr-2" /> Archive Job</Button>
        )}

        {job.status !== JobStatus.CANCELLED && job.status !== JobStatus.COMPLETED && (
          <Button size="sm" variant="destructive"><XCircle className="w-4 h-4 mr-2" /> Cancel Job</Button>
        )}
      </div>

      <Button size="sm" variant="ghost" onClick={onRefresh}>
        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
      </Button>
    </Card>
  );
}
