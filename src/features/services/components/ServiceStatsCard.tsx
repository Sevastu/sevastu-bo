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

export function ServiceStatsCard({ title, value, icon, subtitle, trend, iconClassName = "text-primary bg-primary/10" }: ServiceStatsCardProps) {
    return (
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border/20 flex">
            <div className="flex justify-around items-start mr-6">
                <div className={`p-3 rounded-xl ${iconClassName}`}>
                    {icon}
                </div>
                {trend && (
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${trend.isPositive ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10'}`}>
                        {trend.isPositive ? '+' : '-'}{trend.value}%
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
                {trend && <p className="text-xs text-muted-foreground mt-2">{trend.label}</p>}
            </div>
        </div>
    );
}
