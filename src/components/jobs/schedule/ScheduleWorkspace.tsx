'use client';

import React, { useState } from 'react';
import { useScheduleDetails } from '@/features/fulfillment/hooks/useScheduleDetails';
import { ScheduleSummary } from './ScheduleSummary';
import { ScheduleCalendar } from './ScheduleCalendar';
import { ScheduleTimeline } from './ScheduleTimeline';
import { AvailabilityPanel } from './AvailabilityPanel';
import { ConflictPanel } from './ConflictPanel';
import { ScheduleHistory } from './ScheduleHistory';
import { ScheduleActions } from './ScheduleActions';
import { RescheduleDialog } from './RescheduleDialog';
import { ReplacementWorkerDialog } from './ReplacementWorkerDialog';

interface ScheduleWorkspaceProps {
  jobId: string;
}

export const ScheduleWorkspace: React.FC<ScheduleWorkspaceProps> = ({ jobId }) => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isReplaceOpen, setIsReplaceOpen] = useState(false);

  // We can derive the workerId from the assignment to pass to the hook for availability fetching
  // For a more advanced implementation, we might wait for assignment to load first
  const {
    job,
    schedule,
    assignment,
    timeline,
    availability,
    isLoading,
    isLoadingJob,
    isLoadingSchedule,
    isLoadingAssignment,
    isLoadingTimeline,
    isLoadingAvailability,
    createSchedule,
    reschedule,
    confirmSchedule,
    cancelSchedule,
    replaceWorker,
  } = useScheduleDetails(jobId, 'wkr_002'); // Mocking workerId wkr_002 for demo, realistically this comes from assignment?.workerId

  const handleReschedule = (payload: any) => {
    if (schedule?.id) {
      reschedule.mutate(payload, {
        onSuccess: () => setIsRescheduleOpen(false)
      });
    } else {
      createSchedule.mutate({
        ...payload,
        workerId: assignment?.worker?.id || 'wkr_002'
      }, {
        onSuccess: () => setIsRescheduleOpen(false)
      });
    }
  };

  const handleReplace = (payload: any) => {
    replaceWorker.mutate(payload, {
      onSuccess: () => setIsReplaceOpen(false)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Schedule Summary Cards */}
      <ScheduleSummary 
        schedule={schedule} 
        assignment={assignment} 
        isLoading={isLoadingSchedule || isLoadingAssignment} 
      />

      {/* 2. Validation / Conflict Detection */}
      <ConflictPanel 
        schedule={schedule}
        availability={availability}
        isLoading={isLoadingSchedule || isLoadingAvailability}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content (Calendar & Timeline) */}
        <div className="lg:col-span-2 space-y-6">
          <ScheduleCalendar 
            schedule={schedule}
            availability={availability}
          />
          <ScheduleTimeline 
            timeline={timeline}
            isLoading={isLoadingTimeline}
          />
        </div>

        {/* Right Column - Context & Actions */}
        <div className="space-y-6">
          <ScheduleActions 
            schedule={schedule}
            assignment={assignment}
            isLoading={isLoadingSchedule}
            onOpenReschedule={() => setIsRescheduleOpen(true)}
            onOpenReplace={() => setIsReplaceOpen(true)}
            onConfirm={() => schedule?.id && confirmSchedule.mutate(schedule.id)}
            onCancel={() => schedule?.id && cancelSchedule.mutate(schedule.id)}
            isConfirming={confirmSchedule.isPending}
            isCancelling={cancelSchedule.isPending}
          />
          
          <AvailabilityPanel 
            availability={availability}
            isLoading={isLoadingAvailability}
          />
          
          <ScheduleHistory 
            schedule={schedule}
            isLoading={isLoadingSchedule}
          />
        </div>
      </div>

      {/* Dialogs */}
      <RescheduleDialog 
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        schedule={schedule}
        onReschedule={handleReschedule}
        isRescheduling={reschedule.isPending || createSchedule.isPending}
      />

      <ReplacementWorkerDialog 
        isOpen={isReplaceOpen}
        onClose={() => setIsReplaceOpen(false)}
        schedule={schedule}
        currentAssignment={assignment}
        onReplace={handleReplace}
        isReplacing={replaceWorker.isPending}
        jobId={jobId}
      />
      
    </div>
  );
};
