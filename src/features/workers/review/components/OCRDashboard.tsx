import React, { memo } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewWorkerOcr, ReviewWorkerDetails } from '../types/workerReview.types';
import { OCRStatusBadge } from './OCRStatusBadge';
import { OCRStatCard } from './OCRStatCard';
import { OCRProgressCard } from './OCRProgressCard';
import { getRiskLevel } from '../utils/verificationHelpers';

interface OCRDashboardProps {
    ocr: ReviewWorkerOcr | null;
    profile: ReviewWorkerDetails | null;
    isTriggering: boolean;
    onTriggerOcr: () => void;
}

export const OCRDashboard = memo(function OCRDashboard({ ocr, profile, isTriggering, onTriggerOcr }: OCRDashboardProps) {
    
    const isCompleted = ocr?.status?.toLowerCase() === 'completed';
    
    const address = ocr?.extractedAddress || profile?.address || 'N/A';
    
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return 'N/A';
        }
    };
    
    const maskedAadhaar = ocr?.aadhaarLast4 ? `XXXX-XXXX-${ocr.aadhaarLast4}` : 'N/A';

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                        <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            Automated OCR Analysis
                            <OCRStatusBadge status={ocr?.status || 'Unknown'} />
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">Machine learning verification results</p>
                    </div>
                </div>
                <Button 
                    onClick={onTriggerOcr} 
                    disabled={isTriggering}
                    variant="outline"
                    className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isTriggering ? 'animate-spin text-blue-600' : ''}`} />
                    Run OCR Analysis
                </Button>
            </div>

            {isCompleted ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <OCRStatCard 
                        label="OCR Status" 
                        value={ocr?.status || 'Completed'} 
                        colorClass="text-emerald-600 capitalize"
                    />
                    
                    <OCRProgressCard label="Confidence Score" confidence={ocr?.confidence} />

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

                    <OCRStatCard 
                        label="OCR Generated" 
                        value={formatDate(ocr?.createdAt)} 
                        subValue="Processing started"
                    />

                    <OCRStatCard 
                        label="OCR Updated" 
                        value={formatDate(ocr?.updatedAt)} 
                        subValue="Processing finished"
                    />

                    <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                        <OCRStatCard 
                            label="Worker Address" 
                            value={address} 
                            subValue={ocr?.extractedAddress ? "Location matched from ID" : (profile?.address ? "Fallback to Profile Address" : "Address Not Available")}
                        />
                    </div>
                </div>
            ) : (
                <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 border-dashed text-center">
                    <p className="text-slate-500 font-medium">OCR data is not available or pending.</p>
                </div>
            )}
        </div>
    );
});
