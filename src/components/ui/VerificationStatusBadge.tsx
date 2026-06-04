import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import { WorkerProfileStatus } from '@/lib/enums';

interface VerificationStatusBadgeProps {
  status: WorkerProfileStatus;
}

const statusConfig: Record<WorkerProfileStatus, { label: string; color: string; icon: React.ReactNode }> = {
  [WorkerProfileStatus.DRAFT]: {
    label: 'Draft',
    color: 'bg-gray-100 text-gray-800',
    icon: <FileText size={12} />
  },
  [WorkerProfileStatus.KYC_PENDING]: {
    label: 'KYC Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <Clock size={12} />
  },
  [WorkerProfileStatus.UNDER_REVIEW]: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800',
    icon: <AlertCircle size={12} />
  },
  [WorkerProfileStatus.VERIFIED]: {
    label: 'Verified',
    color: 'bg-green-100 text-green-800',
    icon: <CheckCircle size={12} />
  },
  [WorkerProfileStatus.REJECTED]: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800',
    icon: <XCircle size={12} />
  }
};

export const VerificationStatusBadge: React.FC<VerificationStatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  
  if (!config) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <AlertCircle size={12} />
        Unknown
      </span>
    );
  }
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
};
