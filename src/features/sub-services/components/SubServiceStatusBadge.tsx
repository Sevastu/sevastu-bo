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
                    ? "bg-success/10 text-success hover:bg-success/20 border-none px-2.5 py-0.5 rounded-full font-medium"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 border-none px-2.5 py-0.5 rounded-full font-medium"
            }
        >
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-success' : 'bg-muted-foreground'}`}></span>
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}
