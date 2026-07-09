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
                className="text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 transition-colors p-2 rounded-lg font-medium shadow-sm border border-transparent hover:border-primary/30"
                onClick={() => onViewProfile(customer)}
                title="View Profile"
            >
                <Eye className="w-4 h-4" />
            </button>
            <Dropdown
                className="w-48 bg-card shadow-lg rounded-xl border border-border z-20 overflow-hidden"
                trigger={
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-border">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                }
            >
                <div className="p-1">
                    <button 
                        onClick={() => onViewProfile(customer)} 
                        className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors text-foreground hover:bg-muted"
                    >
                        <Eye className="w-4 h-4 mr-2.5 opacity-70" /> View Details
                    </button>
                    <button 
                        className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors text-foreground hover:bg-muted"
                    >
                        <Edit className="w-4 h-4 mr-2.5 opacity-70" /> Edit Customer
                    </button>
                    <button 
                        className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors text-foreground hover:bg-muted"
                    >
                        <Settings className="w-4 h-4 mr-2.5 opacity-70" /> Account Settings
                    </button>
                </div>
            </Dropdown>
        </div>
    );
}
