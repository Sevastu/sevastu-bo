import React from 'react';

interface WorkerStatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle?: string;
    iconClassName?: string;
}

export function WorkerStats({ title, value, icon, subtitle, iconClassName = "text-blue-600 bg-blue-50" }: WorkerStatsCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex">
            <div className="flex justify-around items-start mr-6">
                <div className={`p-3 rounded-xl ${iconClassName}`}>
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
            </div>
        </div>
    );
}
