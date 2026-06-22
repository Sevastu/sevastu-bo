import React, { memo } from 'react';
import { Phone, MapPin, Calendar, User } from 'lucide-react';
import { getCustomerLocation } from '../../utils/customerHelpers';

interface CustomerInfoSectionProps {
    phone?: string;
    location?: any;
    joinedDate?: string;
    customerId: string;
}

export const CustomerInfoSection = memo(function CustomerInfoSection({
    phone,
    location,
    joinedDate,
    customerId
}: CustomerInfoSectionProps) {
    const formattedDate = joinedDate 
        ? new Date(joinedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) 
        : 'Unknown Date';

    const formattedLocation = getCustomerLocation(location);

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Personal Information</h4>
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 space-y-3 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                        <Phone className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                        {phone || 'Not provided'}
                    </span>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                        <MapPin className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 truncate" title={formattedLocation !== '—' ? formattedLocation : ''}>
                        {formattedLocation !== '—' ? formattedLocation : 'Not provided'}
                    </span>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                        <Calendar className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                        Joined {formattedDate}
                    </span>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                        <User className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 font-mono">
                        ID: {customerId}
                    </span>
                </div>
            </div>
        </div>
    );
});
