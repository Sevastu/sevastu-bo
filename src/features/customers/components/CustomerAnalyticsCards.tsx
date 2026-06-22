import React from 'react';
import { Users, UserCheck, TrendingUp, DollarSign } from 'lucide-react';

interface CustomerAnalytics {
    totalCustomers: number;
    activeCustomers: number;
    inactiveCustomers: number;
    retentionRate: number;
    averageLifetimeValue: number;
}

interface CustomerAnalyticsCardsProps {
    analytics: CustomerAnalytics | null;
}

export function CustomerAnalyticsCards({ analytics }: CustomerAnalyticsCardsProps) {
    if (!analytics) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-blue-600 bg-blue-50">
                        <UserCheck className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-500">Active Now</h3>
                    <div className="text-2xl font-bold text-slate-900">{analytics.activeCustomers}</div>
                    <p className="text-xs text-slate-400 mt-2">Currently active</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-green-600 bg-green-50">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-500">Retention Rate</h3>
                    <div className="text-2xl font-bold text-slate-900">{analytics.retentionRate}%</div>
                    <p className="text-xs text-slate-400 mt-2">Monthly retention</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-purple-600 bg-purple-50">
                        <DollarSign className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-500">Avg. Lifetime Value</h3>
                    <div className="text-2xl font-bold text-slate-900">${analytics.averageLifetimeValue.toFixed(2)}</div>
                    <p className="text-xs text-slate-400 mt-2">Per customer</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-slate-600 bg-slate-50">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-500">Total Customers</h3>
                    <div className="text-2xl font-bold text-slate-900">{analytics.totalCustomers}</div>
                    <p className="text-xs text-slate-400 mt-2">All time</p>
                </div>
            </div>
        </div>
    );
}
