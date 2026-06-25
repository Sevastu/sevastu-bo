import React from 'react';
import { SubServiceStatCard } from './SubServiceStatCard';
import { Layers, CheckCircle2, XCircle, IndianRupee, Tag } from 'lucide-react';

interface SubServiceStatsProps {
    stats: {
        total: number;
        active: number;
        inactive: number;
        avgBasePrice: number;
        fixed: number;
        range: number;
    };
}

export function SubServiceStats({ stats }: SubServiceStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <SubServiceStatCard
                title="Total Sub-Services"
                value={stats.total}
                icon={Layers}
                colorClass="text-blue-600"
                bgClass="bg-blue-50"
            />
            <SubServiceStatCard
                title="Active"
                value={stats.active}
                icon={CheckCircle2}
                colorClass="text-emerald-600"
                bgClass="bg-emerald-50"
            />
            <SubServiceStatCard
                title="Inactive"
                value={stats.inactive}
                icon={XCircle}
                colorClass="text-red-600"
                bgClass="bg-red-50"
            />
            <SubServiceStatCard
                title="Fixed / Range"
                value={`${stats.fixed} / ${stats.range}`}
                icon={Tag}
                colorClass="text-purple-600"
                bgClass="bg-purple-50"
            />
            <SubServiceStatCard
                title="Avg Base Price"
                value={`₹${stats.avgBasePrice}`}
                icon={IndianRupee}
                colorClass="text-amber-600"
                bgClass="bg-amber-50"
            />
        </div>
    );
}
