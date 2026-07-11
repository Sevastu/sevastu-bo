import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/features/fulfillment/types/job.types';
import StatusBadge from '@/components/common/StatusBadge';
import { AlertCircle } from 'lucide-react';
import { jobStatusColors, assignmentStatusColors, scheduleStatusColors } from '@/lib/status-colors';
import { Schedule, ScheduleStatus } from '@/features/fulfillment/types/schedule.types';
import { AssignmentStatus } from '@/features/fulfillment/types/assignment.types';

interface StatusCardProps {
  job: Job;
  schedule?: Schedule | null;
}

export default function StatusCard({ job, schedule }: StatusCardProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" /> Current Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Job Status</span>
            <StatusBadge label={job.status} className={jobStatusColors[job.status]} />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Assignment</span>
            <StatusBadge 
              label={job.currentAssignmentId?.status || 'PENDING'} 
              className={job.currentAssignmentId?.status ? assignmentStatusColors[job.currentAssignmentId.status as AssignmentStatus] : 'bg-secondary text-secondary-foreground'} 
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Schedule</span>
            <StatusBadge 
              label={schedule ? schedule.status : ScheduleStatus.PENDING} 
              className={schedule ? scheduleStatusColors[schedule.status] : scheduleStatusColors[ScheduleStatus.PENDING]} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
