import React, { memo } from 'react';

interface OCRStatusBadgeProps {
    status: string;
}

export const OCRStatusBadge = memo(function OCRStatusBadge({ status }: OCRStatusBadgeProps) {
    const normalized = (status || '').toLowerCase();
    let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
    
    if (normalized === 'completed') colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (normalized === 'pending') colorClass = 'bg-blue-100 text-blue-700 border-blue-200';
    if (normalized === 'failed') colorClass = 'bg-rose-100 text-rose-700 border-rose-200';

    return (
        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border capitalize ${colorClass}`}>
            {status}
        </span>
    );
});
