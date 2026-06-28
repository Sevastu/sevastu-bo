import React from 'react';

interface ServiceStatsCardProps {
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

export function ServiceStatsCard({ title, value, icon, subtitle, trend, iconClassName = "text-blue-600 bg-blue-50" }: ServiceStatsCardProps) {
    return (
        <div className="bg-card rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex">
            <div className="flex justify-around items-start mr-6">
                <div className={`p-3 rounded-xl ${iconClassName}`}>
                    {icon}
                </div>
                {trend && (
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${trend.isPositive ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                        {trend.isPositive ? '+' : '-'}{trend.value}%
                    </div>
                )}
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
