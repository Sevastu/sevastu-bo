import React, { memo } from 'react';

interface OCRStatCardProps {
    label: string;
    value: string;
    subValue?: string;
    colorClass?: string;
}

export const OCRStatCard = memo(function OCRStatCard({ label, value, subValue, colorClass = "text-foreground" }: OCRStatCardProps) {
    return (
        <div className="bg-muted rounded-xl p-4 border border-border">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-lg font-bold ${colorClass}`}>{value}</p>
            {subValue && (
                <p className="text-xs text-muted-foreground font-medium mt-1">{subValue}</p>
            )}
        </div>
    );
});
