import React from 'react';
import { Badge } from '@/components/ui/badge';

interface WorkerStatusBadgeProps {
    status?: string;
    className?: string;
}

export function WorkerStatusBadge({ status, className = '' }: WorkerStatusBadgeProps) {
    const s = status || 'N/A';
    
    let variant: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' = 'secondary';
    let label = s;
    let customClass = '';

    switch (s) {
        case 'verified':
        case 'APPROVED':
            variant = 'success';
            label = 'Verified';
            customClass = 'bg-success/10 text-success border-none hover:bg-success/10';
            break;
        case 'under_review':
        case 'kyc_pending':
            variant = 'secondary';
            label = 'Pending';
            customClass = 'bg-warning/10 text-warning border-none hover:bg-warning/10';
            break;
        case 'rejected':
            variant = 'destructive';
            label = 'Rejected';
            customClass = 'bg-destructive/10 text-destructive border-none hover:bg-destructive/10';
            break;
        case 'draft':
            variant = 'secondary';
            label = 'Draft';
            customClass = 'bg-muted text-foreground border-none hover:bg-muted';
            break;
        default:
            customClass = 'bg-muted text-foreground border-none hover:bg-muted';
            break;
    }

    return (
        <Badge variant={variant} className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-md ${customClass} ${className}`}>
            {label}
        </Badge>
    );
}
