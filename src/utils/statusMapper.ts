import { JobStatus } from '@/constants/status.constants';

export type StatusConfig = {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
};

export const mapJobStatus = (status: JobStatus | string): StatusConfig => {
  switch (status) {
    case JobStatus.CREATED:
      return { label: 'Created', variant: 'default' };
    case JobStatus.MATCHING:
      return { label: 'Matching', variant: 'info' };
    case JobStatus.WAITING_FOR_WORKERS:
      return { label: 'Waiting', variant: 'warning' };
    case JobStatus.ASSIGNED:
      return { label: 'Assigned', variant: 'secondary' };
    case JobStatus.SCHEDULED:
      return { label: 'Scheduled', variant: 'info' };
    case JobStatus.IN_PROGRESS:
      return { label: 'In Progress', variant: 'warning' };
    case JobStatus.COMPLETED:
      return { label: 'Completed', variant: 'success' };
    case JobStatus.CANCELLED:
      return { label: 'Cancelled', variant: 'destructive' };
    default:
      return { label: status || 'Unknown', variant: 'outline' };
  }
};
