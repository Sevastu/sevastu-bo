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
        if (!isCompleted) return <AlertCircle className="w-5 h-5 text-slate-300" />;
        
        // If specific match flag is provided (e.g. for Name Match from backend)
        if (isMatchCheck !== undefined) {
            return isMatchCheck ? 
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                <AlertTriangle className="w-5 h-5 text-amber-500" />;
        }

        // Simple string comparison for other fields
        const strP = String(profileVal || '').trim().toLowerCase();
        const strO = String(ocrVal || '').trim().toLowerCase();
        
        if (!strP || !strO) return <AlertCircle className="w-5 h-5 text-slate-300" />;
        
        return strP === strO ? 
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
            <AlertTriangle className="w-5 h-5 text-amber-500" />;
    };

    return (
        <div className="bg-card rounded-2xl border border-slate-400 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
                <Columns className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Profile vs OCR Comparison</h3>
            </div>
            
            <div className="p-0 overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Field</th>
                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Profile Data</th>
                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">OCR Data</th>
                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-center">Match</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">Name</td>
                            <td className="px-6 py-4 text-sm text-slate-900">{profile?.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-slate-900">{ocr?.extractedName || 'N/A'}</td>
                            <td className="px-6 py-4 flex justify-center">
                                {renderMatchStatus(profile?.name, ocr?.extractedName, ocr?.nameMatch)}
                            </td>
                        </tr>
                        
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">Age / DOB</td>
                            <td className="px-6 py-4 text-sm text-slate-900">{profile?.age ? `${profile.age} yrs` : 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-slate-900">{ocr?.extractedDob || 'N/A'}</td>
                            <td className="px-6 py-4 flex justify-center">
                                {isCompleted ? (ocr?.extractedDob ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />) : <AlertCircle className="w-5 h-5 text-slate-300" />}
                            </td>
                        </tr>
                        
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">Gender</td>
                            <td className="px-6 py-4 text-sm text-slate-900 capitalize">{profile?.gender || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-slate-900 capitalize">
                                {/* @ts-ignore */}
                                {ocr?.extractedGender || 'N/A'}
                            </td>
                            <td className="px-6 py-4 flex justify-center">
                                {/* @ts-ignore */}
                                {renderMatchStatus(profile?.gender, ocr?.extractedGender)}
                            </td>
                        </tr>
                        
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">Aadhaar (Last 4)</td>
                            <td className="px-6 py-4 text-sm text-slate-900">XXXX</td>
                            <td className="px-6 py-4 text-sm text-slate-900 font-mono tracking-widest">{ocr?.aadhaarLast4 || 'N/A'}</td>
                            <td className="px-6 py-4 flex justify-center">
                                {isCompleted && ocr?.aadhaarLast4 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-slate-300" />}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});
