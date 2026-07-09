import React from 'react';

interface WorkerStatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle?: string;
    iconClassName?: string;
}

export function WorkerStats({ title, value, icon, subtitle, iconClassName = "text-primary bg-primary/10" }: WorkerStatsCardProps) {
    return (
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border/20 flex">
            <div className="flex justify-around items-start mr-6">
                <div className={`p-3 rounded-xl ${iconClassName}`}>
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
            </div>
        </div>
    );
}
