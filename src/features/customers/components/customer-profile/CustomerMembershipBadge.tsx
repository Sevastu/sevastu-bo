import React, { memo } from 'react';
import { Badge } from '@/components/ui/badge';

interface CustomerMembershipBadgeProps {
    type?: string;
}

export const CustomerMembershipBadge = memo(function CustomerMembershipBadge({
    type
}: CustomerMembershipBadgeProps) {
    if (!type) return null;

    return (
        <Badge className="bg-purple-100 text-purple-800 border-none font-semibold tracking-wide shadow-sm px-2.5 py-0.5 text-[11px] uppercase">
            {type}
        </Badge>
    );
});
