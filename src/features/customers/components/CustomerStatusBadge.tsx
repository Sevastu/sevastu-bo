import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CustomerStatusBadgeProps {
    status?: string;
    className?: string;
}

export function CustomerStatusBadge({ status, className = '' }: CustomerStatusBadgeProps) {
    const s = status?.toLowerCase() || 'inactive';
    
    let variant: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' = 'secondary';
    let label = 'Inactive';
    let customClass = 'bg-slate-100 text-slate-800 border-none hover:bg-slate-100';

    if (s === 'active') {
        variant = 'success';
        label = 'Active';
        customClass = 'bg-green-100 text-green-800 border-none hover:bg-green-100';
    } else if (s === 'inactive') {
        variant = 'secondary';
        label = 'Inactive';
        customClass = 'bg-slate-100 text-slate-800 border-none hover:bg-slate-100';
    }

    return (
        <Badge variant={variant} className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-md ${customClass} ${className}`}>
            {label}
        </Badge>
    );
}
