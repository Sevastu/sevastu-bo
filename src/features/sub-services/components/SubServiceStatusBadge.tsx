import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SubServiceStatusBadgeProps {
    isActive: boolean;
}

export function SubServiceStatusBadge({ isActive }: SubServiceStatusBadgeProps) {
    return (
        <Badge
            variant={isActive ? "default" : "secondary"}
            className={
                isActive
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-2.5 py-0.5 rounded-full font-medium"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-none px-2.5 py-0.5 rounded-full font-medium"
            }
        >
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}
