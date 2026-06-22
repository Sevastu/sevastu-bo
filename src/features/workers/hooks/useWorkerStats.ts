import { useMemo } from 'react';
import { WorkerUI } from '../types/worker-ui.types';
import { getWorkerRating } from '../utils/workerHelpers';

export function useWorkerStats(allWorkers: WorkerUI[]) {
    return useMemo(() => {
        let verified = 0;
        let pending = 0;
        let rejected = 0;
        let available = 0;
        let totalRating = 0;
        let ratedCount = 0;

        allWorkers.forEach((w) => {
            const status = w.profileStatus;
            if (status === 'verified' || status === 'APPROVED') {
                verified++;
            } else if (status === 'under_review' || status === 'kyc_pending') {
                pending++;
            } else if (status === 'rejected') {
                rejected++;
            }

            if (w.isAvailable) {
                available++;
            }

            const rating = getWorkerRating(w);
            if (rating > 0) {
                totalRating += rating;
                ratedCount++;
            }
        });

        const avgRating = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : '0.0';

        return {
            total: allWorkers.length,
            verified,
            pending,
            rejected,
            available,
            avgRating
        };
    }, [allWorkers]);
}
