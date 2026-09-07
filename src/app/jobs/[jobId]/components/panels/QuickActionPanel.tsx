import React, { useState } from 'react';
import { Job, JobStatus } from '@/features/fulfillment/types/job.types';
import { Assignment } from '@/features/fulfillment/types/assignment.types';
import { Schedule } from '@/features/fulfillment/types/schedule.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, UserPlus, XCircle, RefreshCw, Archive, UserCog, CalendarClock, Zap, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionPanelProps {
  job: Job;
  assignment: Assignment | null;
  schedule: Schedule | null;
  onRefresh: () => void;
  onAssignWorker?: () => void;
  onCreateSchedule?: () => void;
  onReplaceWorker?: () => void;
  onCancelJob?: () => void;
}

export default function QuickActionPanel({ 
  job, 
  assignment, 
  schedule, 
  onRefresh,
  onAssignWorker,
  onCreateSchedule,
  onReplaceWorker,
  onCancelJob 
}: QuickActionPanelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => void | Promise<void>) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  const getActionButton = (status: JobStatus) => {
    switch (status) {
      case JobStatus.CREATED:
        return (
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => handleAction(async () => {
              // Start matching - update job status to MATCHING
              // This would typically call an API to update job status
              onRefresh();
            })}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Start Matching</span>
          </Button>
        );
      
      case JobStatus.MATCHING:
      case JobStatus.WAITING_FOR_WORKERS:
        return (
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => onAssignWorker?.()}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            <span>Assign Worker</span>
          </Button>
        );

      case JobStatus.ASSIGNED:
        if (!schedule) {
          return (
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => onCreateSchedule?.()}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarClock className="w-4 h-4" />}
              <span>Create Schedule</span>
            </Button>
          );
        }
        return null;

      case JobStatus.SCHEDULED:
        return (
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2"
            onClick={() => onReplaceWorker?.()}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCog className="w-4 h-4" />}
            <span>Replace Worker</span>
          </Button>
        );

      case JobStatus.COMPLETED:
        return (
          <Button 
            size="sm" 
            variant="secondary" 
            className="gap-2"
            onClick={() => handleAction(async () => {
              // Archive job functionality
              onRefresh();
            })}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Archive className="w-4 h-4" />}
            <span>Archive Job</span>
          </Button>
        );

      default:
        return null;
    }
  };

  const primaryAction = getActionButton(job.status);
  const canCancel = job.status !== JobStatus.CANCELLED && job.status !== JobStatus.COMPLETED;

  return (
    <Card className="p-5 border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {primaryAction && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recommended Action:
              </span>
              {primaryAction}
            </div>
          )}
          
          {canCancel && (
            <Button 
              size="sm" 
              variant="destructive" 
              className="gap-2"
              onClick={() => onCancelJob?.()}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              <span>Cancel Job</span>
            </Button>
          )}
        </div>

        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onRefresh}
          className="gap-2 text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
    </Card>
  );
}
