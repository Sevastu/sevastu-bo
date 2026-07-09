import React, { memo } from 'react';

interface OCRProgressCardProps {
    label: string;
    confidence: number | undefined;
}

export const OCRProgressCard = memo(function OCRProgressCard({ label, confidence }: OCRProgressCardProps) {
    if (confidence === undefined) return null;
    
    const percentage = Math.round(confidence * 100);
    let colorClass = 'bg-destructive';
    let textClass = 'text-destructive';
    
    if (percentage >= 80) {
        colorClass = 'bg-success';
        textClass = 'text-success';
    } else if (percentage >= 50) {
        colorClass = 'bg-warning';
        textClass = 'text-warning';
    }

    return (
        <div className="bg-muted rounded-xl p-4 border border-border shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                <span className={`text-sm font-bold ${textClass}`}>{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <div 
                    className={`h-full ${colorClass} transition-all duration-1000`} 
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
});
