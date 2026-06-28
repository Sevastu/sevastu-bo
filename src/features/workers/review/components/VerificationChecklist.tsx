import React, { memo } from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, XCircle, Circle } from 'lucide-react';
import { ReviewWorkerDetails, ReviewWorkerOcr, ReviewWorkerKyc } from '../types/workerReview.types';
import { WorkerProfileStatus } from '@/lib/enums';

interface VerificationChecklistProps {
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
    kyc: ReviewWorkerKyc | null;
}

export const VerificationChecklist = memo(function VerificationChecklist({ profile, ocr, kyc }: VerificationChecklistProps) {

    // Status definitions: 'success', 'warning', 'error', 'pending'
    const getCheckItem = (label: string, status: 'success' | 'warning' | 'error' | 'pending') => {
        return { label, status };
    };

    const isOcrCompleted = ocr?.status?.toLowerCase() === 'completed';
    const hasPhoto = !!profile?.photoUrl;
    const hasBasicDetails = !!(profile?.name && profile?.phone && profile?.age);
    const hasAadhaarFront = !!kyc?.frontImage;
    const hasAadhaarBack = !!kyc?.backImage;

    const checklistItems = [
        getCheckItem('Profile Photo Uploaded', hasPhoto ? 'success' : 'error'),
        getCheckItem('Basic Details Complete', hasBasicDetails ? 'success' : 'warning'),
        getCheckItem('Aadhaar Front Uploaded', hasAadhaarFront ? 'success' : 'error'),
        getCheckItem('Aadhaar Back Uploaded', hasAadhaarBack ? 'success' : 'error'),
        getCheckItem('OCR Analysis Completed', isOcrCompleted ? 'success' : (ocr?.status?.toLowerCase() === 'failed' ? 'error' : 'pending')),
        getCheckItem('OCR Name Match', !isOcrCompleted ? 'pending' : (ocr?.nameMatch ? 'success' : 'warning')),
        getCheckItem('Admin Review Status', profile?.verificationStatus === WorkerProfileStatus.VERIFIED ? 'success' : (profile?.verificationStatus === WorkerProfileStatus.REJECTED ? 'error' : 'warning')),
    ];

    const renderIcon = (status: string) => {
        switch (status) {
            case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'error': return <XCircle className="w-5 h-5 text-rose-500" />;
            default: return <Circle className="w-5 h-5 text-slate-300" />;
        }
    };

    return (
        <div className="bg-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Verification Checklist</h3>
            </div>
            <div className="p-4 flex-1">
                <ul className="space-y-1">
                    {checklistItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            {renderIcon(item.status)}
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});
