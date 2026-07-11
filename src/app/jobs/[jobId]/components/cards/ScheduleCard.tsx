import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState } from '@/components/common/StateViews';
import { Schedule } from '@/features/fulfillment/types/schedule.types';
import StatusBadge from '@/components/common/StatusBadge';
import { scheduleStatusColors } from '@/lib/status-colors';
import { formatDate } from '@/lib/date-utils';
import { CalendarClock } from 'lucide-react';

interface ScheduleCardProps {
  schedule: Schedule | null;
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  if (!schedule) {
    return (
      <SectionCard title="Schedule Information">
        <EmptyState 
          title="Not Scheduled" 
          description="The worker has not been scheduled for this job yet." 
          icon={<CalendarClock />}
          className="min-h-[150px] py-4"
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard 
      title="Schedule Information" 
      action={<StatusBadge label={schedule.status} className={scheduleStatusColors[schedule.status]} />}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Scheduled Start</p>
          <p className="text-sm font-medium">{schedule.scheduledStart ? formatDate(new Date(schedule.scheduledStart), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Scheduled End</p>
          <p className="text-sm font-medium">{schedule.scheduledEnd ? formatDate(new Date(schedule.scheduledEnd), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confirmed At</p>
          <p className="text-sm font-medium">{schedule.confirmedAt ? formatDate(new Date(schedule.confirmedAt), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
        {schedule.replacementWorkerId && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Replacement Worker</p>
            <p className="text-sm font-medium text-amber-600">{schedule.replacementWorkerId}</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
