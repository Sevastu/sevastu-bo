import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';

interface StatusBadgeProps {
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
}

const statusConfig = {
  open: {
    label: 'Open',
    color: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
    icon: <AlertCircle size={12} />
  },
  assigned: {
    label: 'Assigned',
    color: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
    icon: <User size={12} />
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
    icon: <Clock size={12} />
  },
  completed: {
    label: 'Completed',
    color: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
    icon: <CheckCircle size={12} />
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-[var(--color-error)]/10 text-[var(--color-error)]',
    icon: <XCircle size={12} />
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
};
