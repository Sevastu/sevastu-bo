import React from 'react';
import { MoreVertical, Edit2, Power, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SubService } from '@/features/services/types';

interface SubServiceActionsDropdownProps {
    subService: SubService;
    onEdit: (subService: SubService) => void;
    onToggleStatus: (id: string, currentStatus: boolean) => void;
    isAdmin: boolean;
}

export function SubServiceActionsDropdown({ subService, onEdit, onToggleStatus, isAdmin }: SubServiceActionsDropdownProps) {
    if (!isAdmin) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100">
                    <MoreVertical className="w-4 h-4 text-slate-500" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200 shadow-lg">
                <DropdownMenuItem onClick={() => onEdit(subService)} className="cursor-pointer py-2.5">
                    <Edit2 className="w-4 h-4 mr-2 text-slate-500" />
                    <span className="font-medium text-slate-700">Edit Details</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-100" />
                
                <DropdownMenuItem onClick={() => onToggleStatus(subService._id, subService.isActive)} className="cursor-pointer py-2.5">
                    <Power className={`w-4 h-4 mr-2 ${subService.isActive ? 'text-amber-500' : 'text-emerald-500'}`} />
                    <span className="font-medium text-slate-700">
                        {subService.isActive ? 'Deactivate' : 'Activate'}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
