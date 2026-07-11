import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState } from '@/components/common/StateViews';
import { Assignment } from '@/features/fulfillment/types/assignment.types';
import StatusBadge from '@/components/common/StatusBadge';
import { assignmentStatusColors } from '@/lib/status-colors';
import { formatDate } from '@/lib/date-utils';
import { ClipboardList } from 'lucide-react';

interface AssignmentCardProps {
  assignment: Assignment | null;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  if (!assignment) {
    return (
      <SectionCard title="Assignment Lifecycle">
        <EmptyState 
          title="No Assignment" 
          description="Lifecycle events will appear here once assigned." 
          icon={<ClipboardList />}
          className="min-h-[150px] py-4"
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard 
      title="Assignment Lifecycle" 
      action={<StatusBadge label={assignment.status} className={assignmentStatusColors[assignment.status]} />}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Assigned At</p>
          <p className="text-sm font-medium">{assignment.createdAt ? formatDate(new Date(assignment.createdAt), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Accepted At</p>
          <p className="text-sm font-medium">{assignment.acceptedAt ? formatDate(new Date(assignment.acceptedAt), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Started At</p>
          <p className="text-sm font-medium">{assignment.startedAt ? formatDate(new Date(assignment.startedAt), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Completed At</p>
          <p className="text-sm font-medium">{assignment.completedAt ? formatDate(new Date(assignment.completedAt), "dd MMM yyyy, hh:mm a") : '-'}</p>
        </div>
      </div>
    </SectionCard>
  );
}
