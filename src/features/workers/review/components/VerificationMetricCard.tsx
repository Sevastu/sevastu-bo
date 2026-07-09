import React, { memo } from 'react';

interface VerificationMetricCardProps {
    title: string;
    value: React.ReactNode;
    icon: React.ElementType;
    color: 'emerald' | 'amber' | 'blue' | 'rose' | 'slate';
}

export const VerificationMetricCard = memo(function VerificationMetricCard({
    title,
    value,
    icon: Icon,
    color
}: VerificationMetricCardProps) {
    const colorClasses = {
        emerald: 'bg-success/10 border-success/20 text-success',
        amber: 'bg-warning/10 border-warning/20 text-warning',
        blue: 'bg-primary/10 border-primary/20 text-primary',
        rose: 'bg-destructive/10 border-destructive/20 text-destructive',
        slate: 'bg-muted border-border text-muted-foreground',
    };

    const iconBgClasses = {
        emerald: 'bg-success/20',
        amber: 'bg-warning/20',
        blue: 'bg-primary/20',
        rose: 'bg-destructive/20',
        slate: 'bg-muted',
    };

    return (
        <div className={`rounded-2xl border p-5 flex items-center justify-between shadow-sm transition-all hover:shadow-md ${colorClasses[color]}`}>
            <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{title}</p>
                <div className="text-xl sm:text-2xl font-black text-foreground">{value}</div>
            </div>
            <div className={`p-3 rounded-xl ${iconBgClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
});
