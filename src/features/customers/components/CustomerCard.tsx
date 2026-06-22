import React from 'react';
import { CustomerUI } from '../types/customer-ui.types';
import { CustomerAvatar } from './CustomerAvatar';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { CustomerActionsDropdown } from './CustomerActionsDropdown';
import { getCustomerLocation, formatCurrency } from '../utils/customerHelpers';
import { MapPin, Phone, Calendar } from 'lucide-react';

interface CustomerCardProps {
    customer: CustomerUI;
    onClick: (customer: CustomerUI) => void;
    onViewProfile: (customer: CustomerUI) => void;
}

export function CustomerCard({ customer, onClick, onViewProfile }: CustomerCardProps) {
    return (
        <div 
            className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-slate-100 overflow-hidden hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg transition-all duration-300 ease-out flex flex-col h-full cursor-pointer"
            onClick={() => onClick(customer)}
        >
            <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <CustomerAvatar photoUrl={customer.avatarUrl} name={customer.name} className="w-14 h-14" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {customer.name || '—'}
                        </h3>
                        <div className="text-sm text-slate-500 mt-0.5 truncate max-w-[200px]">
                            {customer.email || '—'}
                        </div>
                    </div>
                </div>
                <CustomerActionsDropdown customer={customer} onViewProfile={onViewProfile} />
            </div>

            <div className="px-6 py-2 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                    <CustomerStatusBadge status={customer.status} />
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        LTV: <span className="text-slate-700">{formatCurrency(customer.totalSpent)}</span>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center text-slate-600 text-sm">
                        <Phone className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                        {customer.phone || 'No phone'}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                        <span className="truncate">{getCustomerLocation(customer.location)}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-4 mt-auto border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <div className="text-[11px] font-medium text-slate-500 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                    Joined {customer.joinedDate ? new Date(customer.joinedDate).toLocaleDateString() : '—'}
                </div>
            </div>
        </div>
    );
}
