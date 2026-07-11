'use client';

import React from 'react';
import { useWorkerOperations } from '@/features/fulfillment/hooks/useWorkerOperations';
import { WorkerSummaryCard } from './WorkerSummaryCard';
import { AvailabilityStatusCard } from './AvailabilityStatusCard';
import { WorkerTimeline } from './WorkerTimeline';
import { WorkingHoursCard } from './WorkingHoursCard';
import { BlockedSlotsCard } from './BlockedSlotsCard';
import { LeaveCard } from './LeaveCard';
import { AssignmentsCard } from './AssignmentsCard';
import { SchedulesCard } from './SchedulesCard';
import { PerformanceCard } from './PerformanceCard';
import { QuickActions } from './QuickActions';
import { toast } from 'sonner';

interface WorkerOperationsWorkspaceProps {
  workerId: string;
}

export const WorkerOperationsWorkspace: React.FC<WorkerOperationsWorkspaceProps> = ({ workerId }) => {
  const {
    workerData,
    jobsData,
    isLoading,
    removeBlock,
  } = useWorkerOperations(workerId);

  // Quick Action handlers (would typically open dialogs, simplified for demo)
  const handleEditWorkingHours = () => toast.info('Edit Working Hours dialog opened');
  const handleBlockSlot = () => toast.info('Block Slot dialog opened');
  const handleApproveLeave = () => toast.info('Approve Leave dialog opened');
  const handleAssignJob = () => toast.info('Assign Job dialog opened');

  return (
    <div className="space-y-6">
      
      {/* Top Section: Summary & Live Status */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <WorkerSummaryCard workerData={workerData} isLoading={isLoading} />
        </div>
        <div className="xl:col-span-1">
          <AvailabilityStatusCard workerData={workerData} isLoading={isLoading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Timeline & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
            {/* Timeline is height constrained here */}
            <div className="h-full">
              <WorkerTimeline timelineData={workerData?.timeline} isLoading={isLoading} />
            </div>
            
            <div className="space-y-6 overflow-y-auto pr-1 h-full">
              <AssignmentsCard jobsData={jobsData} isLoading={isLoading} />
              <SchedulesCard jobsData={jobsData} isLoading={isLoading} />
            </div>
          </div>
          
          <WorkingHoursCard workerData={workerData} isLoading={isLoading} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlockedSlotsCard 
              workerData={workerData} 
              isLoading={isLoading} 
              onRemoveBlock={(id) => removeBlock.mutate(id)}
            />
            <LeaveCard workerData={workerData} isLoading={isLoading} />
          </div>
        </div>

        {/* Right Column: Performance & Actions */}
        <div className="space-y-6">
          <QuickActions 
            isLoading={isLoading}
            onEditWorkingHours={handleEditWorkingHours}
            onBlockSlot={handleBlockSlot}
            onApproveLeave={handleApproveLeave}
            onAssignJob={handleAssignJob}
          />
          <PerformanceCard workerData={workerData} isLoading={isLoading} />
        </div>

      </div>

    </div>
  );
};
