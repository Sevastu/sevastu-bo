import { useMemo } from 'react';
import { ReviewWorkerKyc, ReviewWorkerOcr } from '../types/workerReview.types';

export interface ScoreDetails {
    totalScore: number;
    points: {
        idFront: number;
        idBack: number;
        pan: number;
        ocrNameMatch: number;
        ocrHighConfidence: number;
    };
    maxScore: number;
}

export function useVerificationScore(kyc: ReviewWorkerKyc | null, ocr: ReviewWorkerOcr | null): ScoreDetails {
    return useMemo(() => {
        const points = {
            idFront: 0,
            idBack: 0,
            pan: 0,
            ocrNameMatch: 0,
            ocrHighConfidence: 0
        };

        let score = 0;

        if (kyc?.frontImage) {
            points.idFront = 25;
            score += 25;
        }
        if (kyc?.backImage) {
            points.idBack = 25;
            score += 25;
        }

        if (ocr && ocr.status?.toLowerCase() === 'completed') {
            if (ocr.nameMatch || (ocr.nameMatchScore && ocr.nameMatchScore >= 0.8)) {
                points.ocrNameMatch = 25;
                score += 25;
            }

            if (ocr.confidence && ocr.confidence > 0.4) {
                points.ocrHighConfidence = 25;
                score += 25;
            }
        }

        return {
            totalScore: score,
            points,
            maxScore: 100
        };
    }, [kyc, ocr]);
}
