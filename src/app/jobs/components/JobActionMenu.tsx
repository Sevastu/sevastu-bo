import React from 'react';
import { useRouter } from 'next/navigation';
import ActionMenu, { ActionMenuItem } from '@/components/common/ActionMenu';
import { Job, JobStatus } from '@/features/fulfillment/types/job.types';
import { Eye, Calendar, UserPlus, History, XCircle } from 'lucide-react';

interface JobActionMenuProps {
  job: Job;
  onView?: (job: Job) => void;
  onAssign?: (job: Job) => void;
  onSchedule?: (job: Job) => void;
  onTimeline?: (job: Job) => void;
  onCancel?: (job: Job) => void;
}

export default function JobActionMenu({
  job,
  onView,
  onAssign,
  onSchedule,
  onTimeline,
  onCancel,
}: JobActionMenuProps) {
  const router = useRouter();
  
  const isCancellable = ![JobStatus.COMPLETED, JobStatus.CANCELLED].includes(job.status);
  const isAssignable = [JobStatus.CREATED, JobStatus.WAITING_FOR_WORKERS, JobStatus.MATCHING].includes(job.status);

  const handleNavigation = (hash?: string) => {
    // Navigate to the Job Operations Workspace
    router.push(`/jobs/${job.id}${hash ? `#${hash}` : ''}`);
  };

  const items: (ActionMenuItem | 'separator')[] = [
    {
      label: 'View Details',
      icon: <Eye className="w-4 h-4" />,
      onClick: () => onView ? onView(job) : handleNavigation(),
    },
    {
      label: 'Assign Worker',
      icon: <UserPlus className="w-4 h-4" />,
      onClick: () => onAssign ? onAssign(job) : handleNavigation('assignment'),
      disabled: !isAssignable,
    },
    {
      label: 'Schedule',
      icon: <Calendar className="w-4 h-4" />,
      onClick: () => onSchedule ? onSchedule(job) : handleNavigation('schedule'),
    },
    {
      label: 'Timeline',
      icon: <History className="w-4 h-4" />,
      onClick: () => onTimeline ? onTimeline(job) : handleNavigation('timeline'),
    },
  ];

  if (isCancellable) {
    items.push('separator');
    items.push({
      label: 'Cancel Job',
      icon: <XCircle className="w-4 h-4" />,
      onClick: () => {
        if (onCancel) {
          onCancel(job);
        } else {
          console.warn('Cancel action requires onCancel prop to handle dialog state');
        }
      },
      variant: 'destructive',
    });
  }

  return <ActionMenu items={items} />;
}
