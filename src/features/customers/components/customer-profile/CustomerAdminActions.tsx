import React, { memo } from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerAdminActionsProps {
    onBlockUser: () => void;
    customerId: string;
}

export const CustomerAdminActions = memo(function CustomerAdminActions({
    onBlockUser,
    customerId
}: CustomerAdminActionsProps) {
    return (
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] sticky bottom-0 z-10">
            <Button
                onClick={onBlockUser}
                variant="outline"
                className="flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm"
            >
                <Shield className="w-4 h-4 mr-2" />
                Block User
            </Button>
            <Button
                variant="default"
                className="flex-1 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                onClick={() => console.log('View Full Profile', customerId)}
            >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Profile
            </Button>
        </div>
    );
});
