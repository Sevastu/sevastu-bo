import { useState, useEffect, useCallback } from 'react';
import { fetchWorkerDetails } from '@/features/workers/api';
import { ReviewWorkerDetails, ReviewWorkerKyc, ReviewWorkerOcr } from '../types/workerReview.types';

export function useWorkerReview(workerUserId: string) {
    const [profile, setProfile] = useState<ReviewWorkerDetails | null>(null);
    const [kyc, setKyc] = useState<ReviewWorkerKyc | null>(null);
    const [ocr, setOcr] = useState<ReviewWorkerOcr | null>(null);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchWorkerDetails(workerUserId);
            if (!data) throw new Error("Worker details not found");
            
            setProfile((data.profile as unknown as ReviewWorkerDetails) || null);
            setKyc((data.kyc as unknown as ReviewWorkerKyc) || null);
            setOcr((data.ocr as unknown as ReviewWorkerOcr) || null);
        } catch (err) {
            console.error("Failed to fetch worker details:", err);
            setError("Failed to fetch worker details. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [workerUserId]);

    useEffect(() => {
        if (workerUserId) {
            loadDetails();
        }
    }, [workerUserId, loadDetails]);

    return {
        profile,
        kyc,
        ocr,
        isLoading,
        error,
        refresh: loadDetails
    };
}
