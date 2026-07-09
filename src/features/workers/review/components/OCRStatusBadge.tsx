import React, { memo } from 'react';

interface OCRStatusBadgeProps {
    status: string;
}

export const OCRStatusBadge = memo(function OCRStatusBadge({ status }: OCRStatusBadgeProps) {
    const normalized = (status || '').toLowerCase();
    let colorClass = 'bg-muted text-foreground border-border';
    
    if (normalized === 'completed') colorClass = 'bg-success/10 text-success border-success/20';
    if (normalized === 'pending') colorClass = 'bg-primary/10 text-primary border-primary/20';
    if (normalized === 'failed') colorClass = 'bg-destructive/10 text-destructive border-destructive/20';

    return (
        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border capitalize ${colorClass}`}>
            {status}
        </span>
    );
});
