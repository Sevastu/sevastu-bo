import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/features/fulfillment/types/job.types';
import StatusBadge from '@/components/common/StatusBadge';
import { AlertCircle } from 'lucide-react';
import { jobStatusColors, assignmentStatusColors, scheduleStatusColors } from '@/lib/status-colors';
import { ScheduleStatus } from '@/features/fulfillment/types/schedule.types';
import { AssignmentStatus } from '@/features/fulfillment/types/assignment.types';

interface StatusCardProps {
  job: Job;
}

export default function StatusCard({ job }: StatusCardProps) {
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
              label={job.assignment?.status || 'PENDING'} 
              className={job.assignment?.status ? assignmentStatusColors[job.assignment.status as AssignmentStatus] : 'bg-secondary text-secondary-foreground'} 
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Schedule</span>
            <StatusBadge 
              label={job.confirmedSchedule ? ScheduleStatus.CONFIRMED : ScheduleStatus.PENDING} 
              className={job.confirmedSchedule ? scheduleStatusColors[ScheduleStatus.CONFIRMED] : scheduleStatusColors[ScheduleStatus.PENDING]} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
