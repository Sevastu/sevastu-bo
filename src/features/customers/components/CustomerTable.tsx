import React from 'react';
import { CustomerUI } from '../types/customer-ui.types';
import { CustomerAvatar } from './CustomerAvatar';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { CustomerActionsDropdown } from './CustomerActionsDropdown';
import { getCustomerLocation } from '../utils/customerHelpers';
import { MapPin, Phone, Calendar } from 'lucide-react';

interface CustomerTableProps {
    customers: CustomerUI[];
    onRowClick: (customer: CustomerUI) => void;
    onViewProfile: (customer: CustomerUI) => void;
}

export function CustomerTable({ customers, onRowClick, onViewProfile }: CustomerTableProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-2xl">Customer</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {customers.map(customer => (
                            <tr 
                                key={customer._id} 
                                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                                onClick={() => onRowClick(customer)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <CustomerAvatar photoUrl={customer.avatarUrl} name={customer.name} className="w-10 h-10" />
                                        <div>
                                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {customer.name || '—'}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                                {customer.email || '—'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-slate-700 text-sm">
                                        <Phone className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                                        {customer.phone || '—'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-[200px]">
                                    <div className="flex items-center text-slate-700 text-sm truncate" title={getCustomerLocation(customer.location)}>
                                        <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
                                        <span className="truncate">{getCustomerLocation(customer.location)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <CustomerStatusBadge status={customer.status} />
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                    <div className="flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                                        {customer.joinedDate ? new Date(customer.joinedDate).toLocaleDateString() : '—'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <CustomerActionsDropdown customer={customer} onViewProfile={onViewProfile} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
