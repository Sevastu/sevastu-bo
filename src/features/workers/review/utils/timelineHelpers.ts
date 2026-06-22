import { WorkerProfileStatus } from "@/lib/enums";
import { ReviewWorkerDetails, ReviewWorkerOcr } from "../types/workerReview.types";

export interface TimelineEvent {
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'current' | 'failed';
}

export function generateTimeline(profile: ReviewWorkerDetails | null, ocr: ReviewWorkerOcr | null): TimelineEvent[] {
    const events: TimelineEvent[] = [];

    if (!profile) return events;

    // 1. Registration
    if (profile.createdAt) {
        events.push({
            title: 'Profile Created',
            description: 'Worker registered on the platform.',
            date: new Date(profile.createdAt).toLocaleDateString(),
            status: 'completed'
        });
    }

    // 2. OCR Processing
    if (ocr && ocr.createdAt) {
        let status: 'completed' | 'pending' | 'failed' = 'pending';
        if (ocr.status === 'Completed') status = 'completed';
        if (ocr.status === 'Failed') status = 'failed';
        
        events.push({
            title: 'OCR Scanning',
            description: `Automated document verification ${status.toLowerCase()}.`,
            date: new Date(ocr.createdAt).toLocaleDateString(),
            status
        });
    }

    // 3. Current Verification Status
    let statusLabel = 'Awaiting Review';
    let timelineStatus: 'completed' | 'current' | 'failed' = 'current';

    if (profile.verificationStatus === WorkerProfileStatus.VERIFIED) {
        statusLabel = 'Verified';
        timelineStatus = 'completed';
    } else if (profile.verificationStatus === WorkerProfileStatus.REJECTED) {
        statusLabel = 'Rejected';
        timelineStatus = 'failed';
    }

    events.push({
        title: 'Manual Review',
        description: `Current status: ${statusLabel}`,
        date: profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : '—',
        status: timelineStatus
    });

    return events;
}
