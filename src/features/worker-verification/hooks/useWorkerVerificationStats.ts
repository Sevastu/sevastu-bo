import { useState, useEffect } from 'react';
import { WorkerVerificationUI } from '../types/workerVerification.types';
import { WorkerProfileStatus } from '@/lib/enums';

export interface WorkerVerificationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  successRate: number;
}

export function useWorkerVerificationStats(workers: WorkerVerificationUI[]) {
  const [stats, setStats] = useState<WorkerVerificationStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    successRate: 0,
  });

  useEffect(() => {
    if (!workers) return;

    const total = workers.length;
    const pending = workers.filter(w => 
      w.verificationStatus === WorkerProfileStatus.UNDER_REVIEW || 
      w.verificationStatus === WorkerProfileStatus.KYC_PENDING
    ).length;
    const approved = workers.filter(w => w.verificationStatus === WorkerProfileStatus.VERIFIED).length;
    const rejected = workers.filter(w => w.verificationStatus === WorkerProfileStatus.REJECTED).length;

    const totalProcessed = approved + rejected;
    const successRate = totalProcessed > 0 ? Math.round((approved / totalProcessed) * 100) : 0;

    setStats({
      total,
      pending,
      approved,
      rejected,
      successRate
    });
  }, [workers]);

  return stats;
}
