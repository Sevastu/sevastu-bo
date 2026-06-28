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
        <div className="bg-primary/30 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-100 hover:bg-slate-100 transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">System Information</h3>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
            </button>
            
            {isOpen && (
                <div className="p-6 border-t border-slate-200 bg-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Worker ID (Profile ID)</p>
                        <p className="text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">{profile?._id || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">User ID</p>
                        <p className="text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">{profile?.userId || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">OCR Record ID</p>
                        <p className="text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">{ocr?._id || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Profile Created At</p>
                        <p className="text-sm font-semibold text-slate-900">{profile?.createdAt ? new Date(profile.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Profile Updated At</p>
                        <p className="text-sm font-semibold text-slate-900">{profile?.updatedAt ? new Date(profile.updatedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">OCR Last Updated At</p>
                        <p className="text-sm font-semibold text-slate-900">{ocr?.updatedAt ? new Date(ocr.updatedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                </div>
            )}
        </div>
    );
});
