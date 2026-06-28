import { WorkerProfileStatus } from "@/lib/enums";
import { ReviewWorkerDetails, ReviewWorkerOcr, ReviewWorkerKyc } from "../types/workerReview.types";

export interface TimelineEvent {
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'current' | 'failed';
}

export function generateTimeline(profile: ReviewWorkerDetails | null, ocr: ReviewWorkerOcr | null, kyc: ReviewWorkerKyc | null = null): TimelineEvent[] {
    const events: TimelineEvent[] = [];

    if (!profile) return events;

    // 1. Profile Created
    events.push({
        title: 'Profile Created',
        description: 'Worker registered on the platform.',
        date: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A',
        status: profile.createdAt ? 'completed' : 'pending'
    });

    // 2. Aadhaar Uploaded
    const hasAadhaar = kyc?.frontImage && kyc?.backImage;
    events.push({
        title: 'Aadhaar Uploaded',
        description: hasAadhaar ? 'Front and back ID documents uploaded.' : 'Awaiting ID documents.',
        date: hasAadhaar ? (profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : '—') : '—',
        status: hasAadhaar ? 'completed' : 'pending'
    });

    // 3. OCR Started
    const ocrStarted = !!ocr?.createdAt;
    events.push({
        title: 'OCR Started',
        description: ocrStarted ? 'Automated document analysis initiated.' : 'Pending analysis.',
        date: ocr?.createdAt ? new Date(ocr.createdAt).toLocaleDateString() : '—',
        status: ocrStarted ? 'completed' : 'pending'
    });

    // 4. OCR Completed
    let ocrCompletedStatus: 'completed' | 'pending' | 'failed' = 'pending';
    if (ocr?.status?.toLowerCase() === 'completed') ocrCompletedStatus = 'completed';
    if (ocr?.status?.toLowerCase() === 'failed') ocrCompletedStatus = 'failed';

    events.push({
        title: 'OCR Completed',
        description: ocrCompletedStatus === 'completed' ? 'Analysis finished successfully.' : (ocrCompletedStatus === 'failed' ? 'Analysis failed.' : 'Awaiting results.'),
        date: ocr?.updatedAt && ocrCompletedStatus !== 'pending' ? new Date(ocr.updatedAt).toLocaleDateString() : '—',
        status: ocrCompletedStatus
    });

    // 5. Profile Approved (Manual Review)
    let reviewStatus: 'completed' | 'current' | 'failed' | 'pending' = 'pending';
    if (profile.verificationStatus === WorkerProfileStatus.VERIFIED) {
        reviewStatus = 'completed';
    } else if (profile.verificationStatus === WorkerProfileStatus.REJECTED) {
        reviewStatus = 'failed';
    } else if (ocrCompletedStatus === 'completed') {
        reviewStatus = 'current'; // If OCR is done, admin review is current
    }

    events.push({
        title: 'Profile Approved',
        description: reviewStatus === 'completed' ? 'Admin approved the profile.' : (reviewStatus === 'failed' ? 'Profile rejected.' : 'Awaiting manual review.'),
        date: profile.verificationStatus !== WorkerProfileStatus.UNDER_REVIEW && profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : '—',
        status: reviewStatus
    });

    // 6. Last Updated
    events.push({
        title: 'Last Updated',
        description: 'Most recent activity.',
        date: profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : '—',
        status: 'completed' // Always show last updated if available, technically it's a marker
    });

    return events;
}
