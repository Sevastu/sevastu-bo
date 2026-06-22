import React, { memo, useMemo } from 'react';
import { TimelineItem } from './TimelineItem';
import { generateTimeline } from '../utils/timelineHelpers';
import { ReviewWorkerDetails, ReviewWorkerOcr } from '../types/workerReview.types';

interface VerificationTimelineProps {
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
}

export const VerificationTimeline = memo(function VerificationTimeline({ profile, ocr }: VerificationTimelineProps) {
    const events = useMemo(() => generateTimeline(profile, ocr), [profile, ocr]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                Verification Journey
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
