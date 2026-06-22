import React, { memo } from 'react';
import { CustomerProfileAvatar } from './CustomerProfileAvatar';
import { CustomerStatusBadge } from '../CustomerStatusBadge';
import { CustomerMembershipBadge } from './CustomerMembershipBadge';

interface CustomerProfileHeaderProps {
    name?: string;
    email?: string;
    avatarUrl?: string;
    status: 'active' | 'inactive';
    isOnline?: boolean;
    membershipType?: string;
}

export const CustomerProfileHeader = memo(function CustomerProfileHeader({
    name,
    email,
    avatarUrl,
    status,
    isOnline,
    membershipType
}: CustomerProfileHeaderProps) {
    return (
        <div className="flex items-center space-x-4">
            <CustomerProfileAvatar 
                avatarUrl={avatarUrl} 
                name={name} 
                isOnline={isOnline} 
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 leading-tight truncate">
                    {name || 'Unknown Customer'}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5 truncate">
                    {email || 'No email provided'}
                </p>
                <div className="flex items-center space-x-2 mt-2 flex-wrap gap-y-2">
                    <CustomerStatusBadge status={status} />
                    <CustomerMembershipBadge type={membershipType} />
                </div>
            </div>
        </div>
    );
});
