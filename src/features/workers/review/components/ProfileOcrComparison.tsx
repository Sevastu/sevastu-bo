import React, { memo } from 'react';
import { Columns, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { ReviewWorkerDetails, ReviewWorkerOcr } from '../types/workerReview.types';

interface ProfileOcrComparisonProps {
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
}

export const ProfileOcrComparison = memo(function ProfileOcrComparison({ profile, ocr }: ProfileOcrComparisonProps) {
    
    const isCompleted = ocr?.status?.toLowerCase() === 'completed';

    const renderMatchStatus = (profileVal?: string | number, ocrVal?: string | number, isMatchCheck?: boolean) => {
        if (!isCompleted) return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
        
        // If specific match flag is provided (e.g. for Name Match from backend)
        if (isMatchCheck !== undefined) {
            return isMatchCheck ? 
                <CheckCircle2 className="w-5 h-5 text-success" /> : 
                <AlertTriangle className="w-5 h-5 text-warning" />;
        }

        // Simple string comparison for other fields
        const strP = String(profileVal || '').trim().toLowerCase();
        const strO = String(ocrVal || '').trim().toLowerCase();
        
        if (!strP || !strO) return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
        
        return strP === strO ? 
            <CheckCircle2 className="w-5 h-5 text-success" /> : 
            <AlertTriangle className="w-5 h-5 text-warning" />;
    };

    return (
        <div className="bg-card rounded-lg border border-border/20 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b border-border bg-muted/50 flex items-center gap-2">
                <Columns className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Profile vs OCR Comparison</h3>
            </div>
            
            <div className="p-0 overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                        <tr className="bg-muted border-b border-border">
                            <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase">Field</th>
                            <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase">Profile Data</th>
                            <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase">OCR Data</th>
                            <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase text-center">Match</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">Name</td>
                            <td className="px-6 py-4 text-sm text-foreground">{profile?.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-foreground">{ocr?.extractedName || 'N/A'}</td>
                            <td className="px-6 py-4 flex justify-center">
                                {renderMatchStatus(profile?.name, ocr?.extractedName, ocr?.nameMatch)}
                            </td>
                        </tr>
                        
                        <tr className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">Age / DOB</td>
                            <td className="px-6 py-4 text-sm text-foreground">{profile?.age ? `${profile.age} yrs` : 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-foreground">{ocr?.extractedDob || 'N/A'}</td>
                            <td className="px-6 py-4 flex justify-center">
                                {isCompleted ? (ocr?.extractedDob ? <CheckCircle2 className="w-5 h-5 text-success" /> : <AlertTriangle className="w-5 h-5 text-warning" />) : <AlertCircle className="w-5 h-5 text-muted-foreground" />}
                            </td>
                        </tr>
                        
                        <tr className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">Gender</td>
                            <td className="px-6 py-4 text-sm text-foreground capitalize">{profile?.gender || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-foreground capitalize">
                                {/* @ts-ignore */}
                                {ocr?.extractedGender || 'N/A'}
                            </td>
                            <td className="px-6 py-4 flex justify-center">
                                {/* @ts-ignore */}
                                {renderMatchStatus(profile?.gender, ocr?.extractedGender)}
                            </td>
                        </tr>
                        
                        <tr className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">Aadhaar (Last 4)</td>
                            <td className="px-6 py-4 text-sm text-foreground">XXXX</td>
                            <td className="px-6 py-4 text-sm text-foreground font-mono tracking-widest">{ocr?.aadhaarLast4 || 'N/A'}</td>
                            <td className="px-6 py-4 flex justify-center">
                                {isCompleted && ocr?.aadhaarLast4 ? <CheckCircle2 className="w-5 h-5 text-success" /> : <AlertCircle className="w-5 h-5 text-muted-foreground" />}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});
