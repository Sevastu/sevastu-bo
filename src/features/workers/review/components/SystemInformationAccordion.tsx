import React, { memo, useState } from 'react';
import { ChevronDown, ChevronUp, Server } from 'lucide-react';
import { ReviewWorkerDetails, ReviewWorkerOcr } from '../types/workerReview.types';
import { formatWorkerValue } from '../utils/workerReviewHelpers';

interface SystemInformationAccordionProps {
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
}

export const SystemInformationAccordion = memo(function SystemInformationAccordion({ profile, ocr }: SystemInformationAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-primary/10 rounded-2xl border border-border shadow-sm overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-muted hover:bg-muted transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">System Information</h3>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>
            
            {isOpen && (
                <div className="p-6 border-t border-border bg-muted grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Worker ID (Profile ID)</p>
                        <p className="text-sm font-mono text-foreground bg-card p-2 rounded border border-border">{profile?._id || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">User ID</p>
                        <p className="text-sm font-mono text-foreground bg-card p-2 rounded border border-border">{profile?.userId || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">OCR Record ID</p>
                        <p className="text-sm font-mono text-foreground bg-card p-2 rounded border border-border">{ocr?._id || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Profile Created At</p>
                        <p className="text-sm font-semibold text-foreground">{profile?.createdAt ? new Date(profile.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Profile Updated At</p>
                        <p className="text-sm font-semibold text-foreground">{profile?.updatedAt ? new Date(profile.updatedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">OCR Last Updated At</p>
                        <p className="text-sm font-semibold text-foreground">{ocr?.updatedAt ? new Date(ocr.updatedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                </div>
            )}
        </div>
    );
});
