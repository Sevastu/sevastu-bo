import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface VerificationStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <Clock size={12} />
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-100 text-green-800',
    icon: <CheckCircle size={12} />
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800',
    icon: <XCircle size={12} />
  }
};

export const VerificationStatusBadge: React.FC<VerificationStatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
};
