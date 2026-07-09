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

export function CategoryStatsCard({ title, value, icon, subtitle, trend, iconClassName = "text-primary bg-primary/10" }: CategoryStatsCardProps) {
    return (
        <div className="bg-card rounded-lg p-6 flex border border-border/20 shadow-sm">
            <div className="flex justify-around items-start mr-6">
                <div className={`p-3 rounded-xl ${iconClassName}`}>
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-medium text-text">{title}</h3>
                <div className="text-2xl font-bold text-text ">{value}</div>
                {subtitle && <p className="text-xs text-text  mt-2">{subtitle}</p>}
                {trend && <p className="text-xs text-text mt-2">{trend.label}</p>}
            </div>
        </div>
    );
}
