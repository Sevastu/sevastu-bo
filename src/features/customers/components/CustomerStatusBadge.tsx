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
    let customClass = 'bg-muted text-foreground border-none hover:bg-muted';

    if (s === 'active') {
        variant = 'success';
        label = 'Active';
        customClass = 'bg-success/10 text-success border-none hover:bg-success/10';
    } else if (s === 'inactive') {
        variant = 'secondary';
        label = 'Inactive';
        customClass = 'bg-muted text-foreground border-none hover:bg-muted';
    }

    return (
        <Badge variant={variant} className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-md ${customClass} ${className}`}>
            {label}
        </Badge>
    );
}
