import React from 'react';

interface CategoryStatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle?: string;
    trend?: {
        value: number;
        label: string;
        isPositive: boolean;
    };
    iconClassName?: string;
}

export function CategoryStatsCard({ title, value, icon, subtitle, trend, iconClassName = "text-blue-600 bg-blue-50" }: CategoryStatsCardProps) {
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
                {trend && <p className="text-xs text-slate-400 mt-2">{trend.label}</p>}
            </div>
        </div>
    );
}
