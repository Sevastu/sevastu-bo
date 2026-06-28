import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SubServiceStatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    colorClass: string;
    bgClass: string;
}

export function SubServiceStatCard({ title, value, icon: Icon, trend, colorClass, bgClass }: SubServiceStatCardProps) {
    return (
        <Card className="border-slate-200 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl overflow-hidden group">
            <CardContent className="p-6 flex gap-4 items-center">
                <div className="items-center justify-between">
                    <div className={`p-3 rounded-xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    {trend && (
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            trend.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
}
