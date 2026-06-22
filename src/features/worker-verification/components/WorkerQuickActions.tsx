import React, { memo } from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { WORKER_VERIFICATION_CONSTANTS } from '../utils/workerVerificationConstants';
import { WorkerProfileStatus } from '@/lib/enums';

interface WorkerQuickActionsProps {
  status: WorkerProfileStatus;
  onApprove: () => void;
  onReject: () => void;
  onViewDocuments: () => void;
}

export const WorkerQuickActions = memo(function WorkerQuickActions({
  status,
  onApprove,
  onReject,
  onViewDocuments
}: WorkerQuickActionsProps) {
  if (status !== WorkerProfileStatus.KYC_PENDING && status !== WorkerProfileStatus.UNDER_REVIEW) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        onClick={onViewDocuments}
        className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 shadow-sm transition-all font-semibold flex items-center justify-center gap-2"
      >
        <Eye size={16} />
        {WORKER_VERIFICATION_CONSTANTS.REVIEW_AND_APPROVE}
      </button>
      <button
        onClick={onApprove}
        className="flex-1 bg-emerald-500 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-600 shadow-sm transition-all font-semibold flex items-center justify-center gap-2"
      >
        <CheckCircle size={16} />
        {WORKER_VERIFICATION_CONSTANTS.QUICK_APPROVE}
      </button>
      <button
        onClick={onReject}
        className="flex-1 bg-rose-500 text-white px-4 py-2.5 rounded-xl hover:bg-rose-600 shadow-sm transition-all font-semibold flex items-center justify-center gap-2"
      >
        <XCircle size={16} />
        {WORKER_VERIFICATION_CONSTANTS.QUICK_REJECT}
      </button>
    </div>
  );
});
