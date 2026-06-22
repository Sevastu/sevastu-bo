import React, { memo } from 'react';
import { CustomerBookingCard } from './CustomerBookingCard';
import { CalendarX } from 'lucide-react';

interface CustomerBookingsListProps {
    bookings?: Array<{
        id: string;
        serviceType: string;
        date: string;
        status: string;
        amount: number;
    }>;
}

export const CustomerBookingsList = memo(function CustomerBookingsList({
    bookings
}: CustomerBookingsListProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Bookings</h4>
                {bookings && bookings.length > 5 && (
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        View All
                    </button>
                )}
            </div>
            
            <div className="space-y-3">
                {bookings && bookings.length > 0 ? (
                    bookings.slice(0, 5).map((booking) => (
                        <CustomerBookingCard key={booking.id} booking={booking} />
                    ))
                ) : (
                    <div className="bg-slate-50/50 rounded-xl p-8 border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-3">
                            <CalendarX className="w-5 h-5 text-slate-300" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">No recent bookings found</p>
                        <p className="text-xs text-slate-400 mt-1">This customer hasn't made any bookings yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
});
