import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/features/fulfillment/types/job.types';
import StatusBadge from '@/components/common/StatusBadge';
import { Activity, Workflow, Calendar } from 'lucide-react';
import { jobStatusColors, assignmentStatusColors, scheduleStatusColors } from '@/lib/status-colors';
import { Schedule, ScheduleStatus } from '@/features/fulfillment/types/schedule.types';
import { AssignmentStatus } from '@/features/fulfillment/types/assignment.types';

interface StatusCardProps {
  job: Job;
  schedule?: Schedule | null;
}

export default function StatusCard({ job, schedule }: StatusCardProps) {
  const statusItems = [
    {
      icon: Activity,
      label: 'Job Status',
      value: job.status,
      colors: jobStatusColors[job.status]
    },
    {
      icon: Workflow,
      label: 'Assignment',
      value: job.currentAssignmentId?.status || 'PENDING',
      colors: job.currentAssignmentId?.status 
        ? assignmentStatusColors[job.currentAssignmentId.status as AssignmentStatus] 
        : 'bg-secondary text-secondary-foreground'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      value: schedule ? schedule.status : ScheduleStatus.PENDING,
      colors: schedule ? scheduleStatusColors[schedule.status] : scheduleStatusColors[ScheduleStatus.PENDING]
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
          <Activity className="w-4 h-4" /> Current Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 pt-1">
          {statusItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <StatusBadge label={item.value} className={item.colors} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
