import React, { memo } from 'react';
import { WorkerProfileStatus } from '@/lib/enums';
import { Badge } from '@/components/ui/badge';

interface VerificationStatusBadgeProps {
  status: WorkerProfileStatus;
}

export const VerificationStatusBadge = memo(function VerificationStatusBadge({ status }: VerificationStatusBadgeProps) {
  let label = 'Unknown';
  let variantClass = 'bg-muted text-foreground';

  switch (status) {
    case WorkerProfileStatus.VERIFIED:
      label = 'Verified';
      variantClass = 'bg-success/10 text-success';
      break;
    case WorkerProfileStatus.UNDER_REVIEW:
      label = 'Under Review';
      variantClass = 'bg-primary/10 text-primary';
      break;
    case WorkerProfileStatus.KYC_PENDING:
      label = 'KYC Pending';
      variantClass = 'bg-warning/10 text-warning';
      break;
    case WorkerProfileStatus.REJECTED:
      label = 'Rejected';
      variantClass = 'bg-destructive/10 text-destructive';
      break;
    case WorkerProfileStatus.DRAFT:
      label = 'Draft';
      variantClass = 'bg-muted text-foreground';
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
