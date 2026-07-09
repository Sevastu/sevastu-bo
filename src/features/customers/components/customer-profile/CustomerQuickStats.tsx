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
            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20 shadow-sm transition-all hover:shadow-md hover:bg-primary/10 group">
                <div className="flex items-center justify-between">
                    <div className="p-2 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform">
                        <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                        {totalOrders}
                    </span>
                </div>
                <p className="text-xs font-semibold text-primary/80 mt-3 uppercase tracking-wider">Total Bookings</p>
            </div>
            <div className="bg-success/10 rounded-xl p-4 border border-success/20 shadow-sm transition-all hover:shadow-md hover:bg-success/10 group">
                <div className="flex items-center justify-between">
                    <div className="p-2 bg-success/20 rounded-lg group-hover:scale-110 transition-transform">
                        <DollarSign className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                        {formatCurrency(totalSpent)}
                    </span>
                </div>
                <p className="text-xs font-semibold text-success/80 mt-3 uppercase tracking-wider">Total Spent</p>
            </div>
        </div>
    );
});
