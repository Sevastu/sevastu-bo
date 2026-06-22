import React, { memo } from 'react';

interface OCRProgressCardProps {
    label: string;
    confidence: number | undefined;
}

export const OCRProgressCard = memo(function OCRProgressCard({ label, confidence }: OCRProgressCardProps) {
    if (confidence === undefined) return null;
    
    const percentage = Math.round(confidence * 100);
    let colorClass = 'bg-rose-500';
    let textClass = 'text-rose-600';
    
    if (percentage >= 80) {
        colorClass = 'bg-emerald-500';
        textClass = 'text-emerald-600';
    } else if (percentage >= 50) {
        colorClass = 'bg-amber-500';
        textClass = 'text-amber-600';
    }

    return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <span className={`text-sm font-bold ${textClass}`}>{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${colorClass} transition-all duration-1000`} 
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
});
