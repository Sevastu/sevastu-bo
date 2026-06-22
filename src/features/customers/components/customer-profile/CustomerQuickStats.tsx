import React, { memo } from 'react';
import { BookOpen, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/customerHelpers';

interface CustomerQuickStatsProps {
    totalOrders?: number;
    totalSpent?: number;
}

export const CustomerQuickStats = memo(function CustomerQuickStats({
    totalOrders = 0,
    totalSpent = 0
}: CustomerQuickStatsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 shadow-sm transition-all hover:shadow-md hover:bg-blue-50 group">
                <div className="flex items-center justify-between">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">
                        {totalOrders}
                    </span>
                </div>
                <p className="text-xs font-semibold text-blue-600/80 mt-3 uppercase tracking-wider">Total Bookings</p>
            </div>
            <div className="bg-green-50/50 rounded-xl p-4 border border-green-100/50 shadow-sm transition-all hover:shadow-md hover:bg-green-50 group">
                <div className="flex items-center justify-between">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform">
                        <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">
                        {formatCurrency(totalSpent)}
                    </span>
                </div>
                <p className="text-xs font-semibold text-green-600/80 mt-3 uppercase tracking-wider">Total Spent</p>
            </div>
        </div>
    );
});
