import React, { memo } from 'react';
import { ShieldCheck, Activity, AlertCircle, FileText } from 'lucide-react';
import { VerificationMetricCard } from './VerificationMetricCard';
import { ReviewWorkerDetails, ReviewWorkerOcr } from '../types/workerReview.types';
import { WorkerProfileStatus } from '@/lib/enums';

interface VerificationMetricsGridProps {
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
}

export const VerificationMetricsGrid = memo(function VerificationMetricsGrid({ profile, ocr }: VerificationMetricsGridProps) {
    
    // Status Metric
    let statusColor: 'amber' | 'emerald' | 'rose' | 'slate' = 'slate';
    if (profile?.verificationStatus === WorkerProfileStatus.VERIFIED) statusColor = 'emerald';
    if (profile?.verificationStatus === WorkerProfileStatus.UNDER_REVIEW) statusColor = 'amber';
    if (profile?.verificationStatus === WorkerProfileStatus.REJECTED) statusColor = 'rose';

    const statusDisplay = profile?.verificationStatus?.replace(/_/g, ' ') || 'Unknown';

    // OCR Metric
    let ocrColor: 'blue' | 'emerald' | 'rose' | 'slate' = 'slate';
    const ocrStatus = ocr?.status?.toLowerCase() || 'n/a';
    if (ocrStatus === 'completed') ocrColor = 'emerald';
    if (ocrStatus === 'failed') ocrColor = 'rose';
    if (ocrStatus === 'pending') ocrColor = 'blue';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <VerificationMetricCard 
                title="Profile Status"
                value={<span className="capitalize">{statusDisplay.toLowerCase()}</span>}
                icon={ShieldCheck}
                color={statusColor}
            />
            <VerificationMetricCard 
                title="OCR Analysis"
                value={<span className="capitalize">{ocr?.status || 'N/A'}</span>}
                icon={Activity}
                color={ocrColor}
            />
            <VerificationMetricCard 
                title="Jobs Completed"
                value={profile?.completedJobs || '0'}
                icon={FileText}
                color="blue"
            />
            <VerificationMetricCard 
                title="Background Check"
                value="Pending"
                icon={AlertCircle}
                color="amber"
            />
        </div>
    );
});
