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
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
        amber: 'bg-amber-50 border-amber-100 text-amber-600',
        blue: 'bg-blue-50 border-blue-100 text-blue-600',
        rose: 'bg-rose-50 border-rose-100 text-rose-600',
        slate: 'bg-slate-50 border-slate-200 text-slate-600',
    };

    const iconBgClasses = {
        emerald: 'bg-emerald-100',
        amber: 'bg-amber-100',
        blue: 'bg-blue-100',
        rose: 'bg-rose-100',
        slate: 'bg-slate-200',
    };

    return (
        <div className={`rounded-2xl border p-5 flex items-center justify-between shadow-sm transition-all hover:shadow-md ${colorClasses[color]}`}>
            <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{title}</p>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{value}</div>
            </div>
            <div className={`p-3 rounded-xl ${iconBgClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
});
