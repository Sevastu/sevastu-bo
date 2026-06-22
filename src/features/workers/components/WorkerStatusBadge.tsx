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
            customClass = 'bg-green-100 text-green-800 border-none hover:bg-green-100';
            break;
        case 'under_review':
        case 'kyc_pending':
            variant = 'secondary';
            label = 'Pending';
            customClass = 'bg-yellow-100 text-yellow-800 border-none hover:bg-yellow-100';
            break;
        case 'rejected':
            variant = 'destructive';
            label = 'Rejected';
            customClass = 'bg-red-100 text-red-800 border-none hover:bg-red-100';
            break;
        case 'draft':
            variant = 'secondary';
            label = 'Draft';
            customClass = 'bg-slate-100 text-slate-800 border-none hover:bg-slate-100';
            break;
        default:
            customClass = 'bg-slate-100 text-slate-800 border-none hover:bg-slate-100';
            break;
    }

    return (
        <Badge variant={variant} className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-md ${customClass} ${className}`}>
            {label}
        </Badge>
    );
}
