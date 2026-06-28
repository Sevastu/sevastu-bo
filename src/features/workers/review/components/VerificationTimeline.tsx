import React, { memo, useMemo } from 'react';
import { TimelineItem } from './TimelineItem';
import { generateTimeline } from '../utils/timelineHelpers';
import { ReviewWorkerDetails, ReviewWorkerOcr, ReviewWorkerKyc } from '../types/workerReview.types';

interface VerificationTimelineProps {
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
    kyc: ReviewWorkerKyc | null;
}

export const VerificationTimeline = memo(function VerificationTimeline({ profile, ocr, kyc }: VerificationTimelineProps) {
    const events = useMemo(() => generateTimeline(profile, ocr, kyc), [profile, ocr, kyc]);

    return (
        <div className="bg-card rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                Verification Timeline
            </h3>
            <div className="pl-2">
                {events.map((event, i) => (
                    <TimelineItem 
                        key={i} 
                        event={event} 
                        isLast={i === events.length - 1} 
                    />
                ))}
            </div>
        </div>
    );
});
