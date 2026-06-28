import React, { memo } from 'react';
import { Star, Package, IndianRupee, MapPin, Wrench, Clock } from 'lucide-react';
import { ReviewWorkerDetails } from '../types/workerReview.types';

interface QuickStatisticsRowProps {
    profile: ReviewWorkerDetails | null;
}

export const QuickStatisticsRow = memo(function QuickStatisticsRow({ profile }: QuickStatisticsRowProps) {
    const stats = [
        {
            label: 'Rating',
            value: profile?.rating ? `${profile.rating}` : 'N/A',
            icon: Star,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        },
        {
            label: 'Total Jobs',
            value: profile?.completedJobs || '0',
            icon: Package,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            label: 'Base Price',
            // @ts-ignore - assuming basePrice exists or falling back
            value: profile?.basePrice ? `₹${profile.basePrice}` : 'N/A',
            icon: IndianRupee,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
        },
        {
            label: 'Travel Dist.',
            value: profile?.travelDistance ? `${profile.travelDistance} km` : 'N/A',
            icon: MapPin,
            color: 'text-rose-500',
            bg: 'bg-rose-50'
        },
        {
            label: 'Skills',
            value: profile?.skills?.length || '0',
            icon: Wrench,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50'
        },
        {
            label: 'Availability',
            value: profile?.availability ? 'Online' : 'Offline',
            icon: Clock,
            color: profile?.availability ? 'text-emerald-500' : 'text-slate-500',
            bg: profile?.availability ? 'bg-emerald-50' : 'bg-slate-50'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div 
                        key={index} 
                        className="bg-card rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                    >
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} mb-2`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-xl font-bold text-slate-900 leading-tight">
                            {stat.value}
                        </div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                            {stat.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
});
