import React, { memo } from 'react';
import { WorkerProfileStatus } from '@/lib/enums';
import { Badge } from '@/components/ui/badge';

interface VerificationStatusBadgeProps {
  status: WorkerProfileStatus;
}

export const VerificationStatusBadge = memo(function VerificationStatusBadge({ status }: VerificationStatusBadgeProps) {
  let label = 'Unknown';
  let variantClass = 'bg-slate-100 text-slate-800';

  switch (status) {
    case WorkerProfileStatus.VERIFIED:
      label = 'Verified';
      variantClass = 'bg-emerald-100 text-emerald-800';
      break;
    case WorkerProfileStatus.UNDER_REVIEW:
      label = 'Under Review';
      variantClass = 'bg-blue-100 text-blue-800';
      break;
    case WorkerProfileStatus.KYC_PENDING:
      label = 'KYC Pending';
      variantClass = 'bg-amber-100 text-amber-800';
      break;
    case WorkerProfileStatus.REJECTED:
      label = 'Rejected';
      variantClass = 'bg-rose-100 text-rose-800';
      break;
    case WorkerProfileStatus.DRAFT:
      label = 'Draft';
      variantClass = 'bg-slate-100 text-slate-800';
      break;
    default:
      label = status;
      break;
  }

  return (
    <Badge className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase border-none ${variantClass}`}>
      {label}
    </Badge>
  );
});
