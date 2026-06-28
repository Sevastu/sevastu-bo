import React, { memo } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewWorkerOcr, ReviewWorkerDetails } from '../types/workerReview.types';
import { OCRStatusBadge } from './OCRStatusBadge';
import { OCRStatCard } from './OCRStatCard';
import { OCRProgressCard } from './OCRProgressCard';

interface OCRDashboardProps {
    ocr: ReviewWorkerOcr | null;
    profile: ReviewWorkerDetails | null;
    isTriggering: boolean;
    onTriggerOcr: () => void;
}

export const OCRDashboard = memo(function OCRDashboard({ ocr, profile, isTriggering, onTriggerOcr }: OCRDashboardProps) {
    
    const isCompleted = ocr?.status?.toLowerCase() === 'completed';
    const maskedAadhaar = ocr?.aadhaarLast4 ? `XXXX-XXXX-${ocr.aadhaarLast4}` : 'N/A';

    return (
        <div className="bg-card rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        OCR Summary
                        <OCRStatusBadge status={ocr?.status || 'Unknown'} />
                    </h3>
                </div>
                <Button 
                    onClick={onTriggerOcr} 
                    disabled={isTriggering}
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm h-8"
                >
                    <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isTriggering ? 'animate-spin text-blue-600' : ''}`} />
                    Run Analysis
                </Button>
            </div>

            <div className="p-6 flex-1">
                {isCompleted ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-1 sm:col-span-2">
                            <OCRProgressCard label="Confidence Score" confidence={ocr?.confidence} />
                        </div>

                        <OCRStatCard 
                            label="Name Match" 
                            value={ocr?.nameMatch ? "Matched" : "Mismatch"} 
                            colorClass={ocr?.nameMatch ? 'text-emerald-600' : 'text-rose-600'}
                        />

                        <OCRStatCard 
                            label="Extracted Name" 
                            value={ocr?.extractedName || 'N/A'} 
                        />

                        <OCRStatCard 
                            label="Extracted DOB" 
                            value={ocr?.extractedDob || 'N/A'} 
                        />

                        <OCRStatCard 
                            label="Aadhaar Number" 
                            value={maskedAadhaar} 
                        />
                    </div>
                ) : (
                    <div className="h-full min-h-[200px] flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                        <p className="text-slate-500 font-medium">OCR data is not available or pending.</p>
                    </div>
                )}
            </div>
        </div>
    );
});
