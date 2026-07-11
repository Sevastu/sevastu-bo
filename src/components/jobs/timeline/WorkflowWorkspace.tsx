'use client';

import React, { useState } from 'react';
import { useWorkflowTimeline } from '@/features/fulfillment/hooks/useWorkflowTimeline';
import { WorkflowProgress } from './WorkflowProgress';
import { TimelineFeed } from './TimelineFeed';
import { ActivityFeed } from './ActivityFeed';
import { WorkflowInsights } from './WorkflowInsights';
import { NotificationPanel } from './NotificationPanel';
import { TimelineFilters } from './TimelineFilters';
import { QuickActions } from './QuickActions';
import { RelatedPanels } from './RelatedPanels';

interface WorkflowWorkspaceProps {
  jobId?: string;
}

export const WorkflowWorkspace: React.FC<WorkflowWorkspaceProps> = ({ jobId }) => {
  const {
    events,
    job,
    assignment,
    schedule,
    health,
    stageDurations,
    isLoading
  } = useWorkflowTimeline(jobId);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('date_all');

  // Client-side filtering
  const filteredEvents = React.useMemo(() => {
    let result = events || [];
    
    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((e: any) => 
        e.action?.toLowerCase().includes(lower) ||
        e.description?.toLowerCase().includes(lower) ||
        e.message?.toLowerCase().includes(lower) ||
        e.user?.toLowerCase().includes(lower)
      );
    }
    
    // Basic filter example (can be expanded based on specific logic)
    if (activeFilter.startsWith('entity_')) {
      const entity = activeFilter.split('_')[1];
      result = result.filter((e: any) => e.type?.toLowerCase() === entity);
    }
    
    return result;
  }, [events, searchTerm, activeFilter]);

  const isGlobal = !jobId || jobId === 'all';

  return (
    <div className="space-y-6">
      
      {/* Workflow Progress (Only show for specific Job, not global) */}
      {!isGlobal && (
        <WorkflowProgress currentStatus={job?.status} isLoading={isLoading} />
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Feed */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          <TimelineFilters 
            onSearch={setSearchTerm} 
            onFilterChange={setActiveFilter} 
          />
          <TimelineFeed events={filteredEvents} isLoading={isLoading} />
        </div>

        {/* Right Column: Context & Intelligence */}
        <div className="space-y-6">
          
          <NotificationPanel notifications={[]} isLoading={isLoading} />
          
          {!isGlobal && (
            <WorkflowInsights health={health} stageDurations={stageDurations} isLoading={isLoading} />
          )}

          {!isGlobal && (
            <div className="h-[300px]">
              <ActivityFeed events={events} isLoading={isLoading} />
            </div>
          )}

          {!isGlobal && jobId && (
            <QuickActions jobId={jobId} />
          )}

          {!isGlobal && (
            <RelatedPanels 
              assignment={assignment} 
              schedule={schedule} 
              job={job} 
              isLoading={isLoading} 
            />
          )}

        </div>
      </div>
    </div>
  );
};
