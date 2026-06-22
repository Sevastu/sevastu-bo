import React, { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '../../utils/customerHelpers';

interface CustomerBookingCardProps {
    booking: {
        id: string;
        serviceType: string;
        date: string;
        status: string;
        amount: number;
    };
}

export const CustomerBookingCard = memo(function CustomerBookingCard({
    booking
}: CustomerBookingCardProps) {
    const formattedDate = booking.date 
        ? new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) 
        : 'Unknown Date';

    let statusVariant: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' = 'secondary';
    let statusClass = 'bg-slate-100 text-slate-800';

    if (booking.status === 'completed') {
        statusVariant = 'success';
        statusClass = 'bg-green-100 text-green-800';
    } else if (booking.status === 'pending') {
        statusVariant = 'secondary';
        statusClass = 'bg-yellow-100 text-yellow-800';
    } else if (booking.status === 'cancelled') {
        statusVariant = 'destructive';
        statusClass = 'bg-red-100 text-red-800';
    }

    return (
        <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-slate-900">{booking.serviceType || 'Unknown Service'}</p>
                    <p className="text-xs text-slate-500 mt-1">{formattedDate}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                    <p className="text-sm font-bold text-slate-900">
                        {formatCurrency(booking.amount)}
                    </p>
                    <Badge variant={statusVariant} className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0 border-none ${statusClass}`}>
                        {booking.status || 'Unknown'}
                    </Badge>
                </div>
            </div>
        </div>
    );
});
