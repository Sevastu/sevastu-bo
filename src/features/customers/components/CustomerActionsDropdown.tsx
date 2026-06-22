import React from 'react';
import { Dropdown } from '@/components/ui/dropdown';
import { MoreVertical, Eye, Settings, Edit } from 'lucide-react';
import { CustomerUI } from '../types/customer-ui.types';

interface CustomerActionsDropdownProps {
    customer: CustomerUI;
    onViewProfile: (customer: CustomerUI) => void;
}

export function CustomerActionsDropdown({ customer, onViewProfile }: CustomerActionsDropdownProps) {
    return (
        <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
            <button
                className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors p-2 rounded-lg font-medium shadow-sm border border-transparent hover:border-blue-200"
                onClick={() => onViewProfile(customer)}
                title="View Profile"
            >
                <Eye className="w-4 h-4" />
            </button>
            <Dropdown
                className="w-48 bg-white shadow-lg rounded-xl border border-slate-100 z-20 overflow-hidden"
                trigger={
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                }
            >
                <div className="p-1">
                    <button 
                        onClick={() => onViewProfile(customer)} 
                        className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors text-slate-700 hover:bg-slate-50"
                    >
                        <Eye className="w-4 h-4 mr-2.5 opacity-70" /> View Details
                    </button>
                    <button 
                        className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors text-slate-700 hover:bg-slate-50"
                    >
                        <Edit className="w-4 h-4 mr-2.5 opacity-70" /> Edit Customer
                    </button>
                    <button 
                        className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors text-slate-700 hover:bg-slate-50"
                    >
                        <Settings className="w-4 h-4 mr-2.5 opacity-70" /> Account Settings
                    </button>
                </div>
            </Dropdown>
        </div>
    );
}
