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
    let statusClass = 'bg-muted text-foreground';

    if (booking.status === 'completed') {
        statusVariant = 'success';
        statusClass = 'bg-success/10 text-success';
    } else if (booking.status === 'pending') {
        statusVariant = 'secondary';
        statusClass = 'bg-warning/10 text-warning';
    } else if (booking.status === 'cancelled') {
        statusVariant = 'destructive';
        statusClass = 'bg-destructive/10 text-destructive';
    }

    return (
        <div className="bg-muted/50 rounded-xl p-4 border border-border shadow-sm transition-all hover:bg-muted hover:border-border">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-foreground">{booking.serviceType || 'Unknown Service'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                    <p className="text-sm font-bold text-foreground">
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
