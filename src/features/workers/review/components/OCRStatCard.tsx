import React, { memo } from 'react';

interface OCRStatCardProps {
    label: string;
    value: string;
    subValue?: string;
    colorClass?: string;
}

export const OCRStatCard = memo(function OCRStatCard({ label, value, subValue, colorClass = "text-slate-900" }: OCRStatCardProps) {
    return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-lg font-bold ${colorClass}`}>{value}</p>
            {subValue && (
                <p className="text-xs text-slate-500 font-medium mt-1">{subValue}</p>
            )}
        </div>
    );
});
